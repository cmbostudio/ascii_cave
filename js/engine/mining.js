// 이동, 채굴, 자원 획득, 드론 자동 채굴 로직
import { state } from '../state.js';
import { renderMap, hideTargetMarker } from './renderer.js';
import { getInventoryCount, getMaxBagCapacity, getCalculatedMiningDMG } from './stats.js';
import { addLog } from '../ui/log.js';
import { updateInventoryUI } from '../ui/inventory.js';
import { triggerBuildingInteraction } from '../ui/interactions.js';
import { getSkillCritChance, getSkillLuckChance } from './skills.js';

function tryMovePlayer(dx, dy) {
    const newX = state.player.x + dx;
    const newY = state.player.y + dy;

    if (newX < 0 || newX >= state.mapWidth || newY < 0 || newY >= state.mapHeight) return;

    const targetCell = state.mapGrid[newY][newX];

    if (targetCell.type === 'WALL') return;

    if (targetCell.type === 'ORE') {
        mineOreBlock(newX, newY, targetCell);
        return;
    }

    state.player.x = newX;
    state.player.y = newY;

    if (targetCell.type === 'BUILDING' || targetCell.type === 'BUILDING_WALL') {
        triggerBuildingInteraction(targetCell.buildingType);
    }

    renderMap();
}

function mineOreBlock(x, y, cell) {
    const currentCap = getInventoryCount();
    const maxCap = getMaxBagCapacity();

    if (currentCap >= maxCap) {
        addLog(`<span class="text-rose-400">[경고] 인벤토리가 가득 차서 더 이상 채굴할 수 없습니다!</span>`);
        return;
    }

    let dmg = getCalculatedMiningDMG();

    // Check Critical Chance from Nano Glove + [정밀 타격] 패시브 스킬 (합산 확률)
    let isCrit = false;
    const critChance = (state.items.item_nano_glove ? 0.15 : 0) + getSkillCritChance();
    if (critChance > 0 && Math.random() < critChance) {
        dmg *= 2;
        isCrit = true;
    }

    cell.hp -= dmg;

    const critTxt = isCrit ? `<span class="text-amber-300 font-bold">[크리티컬!]</span> ` : '';
    addLog(`${critTxt}광물 [${cell.oreData.name}] 타격! DMG: -${dmg} (${Math.max(0, cell.hp)}/${cell.maxHp})`);

    // Quantum Dynamite Splash Damage Logic
    if (state.items.item_dynamite) {
        const splashDmg = Math.max(1, Math.floor(dmg * 0.3));
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const sx = x + dx;
                const sy = y + dy;
                if (sx >= 0 && sx < state.mapWidth && sy >= 0 && sy < state.mapHeight) {
                    const adjCell = state.mapGrid[sy][sx];
                    if (adjCell.type === 'ORE') {
                        adjCell.hp -= splashDmg;
                        if (adjCell.hp <= 0) {
                            obtainOre(adjCell.oreData);
                            state.mapGrid[sy][sx] = { char: '.', type: 'FLOOR', color: '#1e293b' };
                        }
                    }
                }
            }
        }
    }

    if (cell.hp <= 0) {
        obtainOre(cell.oreData);
        state.mapGrid[y][x] = { char: '.', type: 'FLOOR', color: '#1e293b' };
        if (state.targetPos && state.targetPos.x === x && state.targetPos.y === y) {
            state.targetPos = null;
            hideTargetMarker();
        }
    }

    renderMap();
}

function obtainOre(oreData) {
    const currentCap = getInventoryCount();
    const maxCap = getMaxBagCapacity();

    if (currentCap < maxCap) {
        // [행운의 손] 패시브 스킬: 확률적으로 1개 추가 획득 (가방 여유 칸만큼)
        let gainAmount = 1;
        if (Math.random() < getSkillLuckChance() && currentCap + 1 < maxCap) {
            gainAmount = 2;
        }

        state.inventory[oreData.name] = (state.inventory[oreData.name] || 0) + gainAmount;
        state.stats.totalMined[oreData.name] = (state.stats.totalMined[oreData.name] || 0) + gainAmount;

        const luckTxt = gainAmount > 1 ? `<span class="text-amber-300 font-bold">[행운!]</span> ` : '';
        addLog(`${luckTxt}<span class="text-emerald-400">[채굴 성공] ${oreData.name} 획득! (총 채굴: ${state.stats.totalMined[oreData.name]}개)</span>`);
        updateInventoryUI();
    }
}

/* Drone Auto Mining Handler */
let droneTimer = 0;
function handleDroneMining(deltaSec) {
    if (!state.items.item_drone || state.currentSectorId === 0) return;

    droneTimer += deltaSec;
    if (droneTimer >= 1.0) {
        droneTimer = 0;
        const px = state.player.x;
        const py = state.player.y;
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

        for (let d of dirs) {
            const nx = px + d[0];
            const ny = py + d[1];
            if (nx >= 0 && nx < state.mapWidth && ny >= 0 && ny < state.mapHeight) {
                const cell = state.mapGrid[ny][nx];
                if (cell.type === 'ORE') {
                    cell.hp -= 150; 
                    addLog(`<span class="text-sky-300">[드론] 주변 ${cell.oreData.name} 타격! (-150 HP)</span>`);
                    if (cell.hp <= 0) {
                        obtainOre(cell.oreData);
                        state.mapGrid[ny][nx] = { char: '.', type: 'FLOOR', color: '#1e293b' };
                    }
                    renderMap();
                    break;
                }
            }
        }
    }
}

export { tryMovePlayer, mineOreBlock, obtainOre, handleDroneMining };
