// 맵 생성기: 로비 및 1~20구역 절차적 맵 생성
import { state } from '../state.js';
import { SECTOR_DATA } from '../data/sectors.js';
import { renderMap, hideTargetMarker } from './renderer.js';
import { updateUIHeaderAndInfo } from '../ui/header.js';

function generateMap(sectorId) {
    state.currentSectorId = sectorId;
    state.targetPos = null;
    state.currentMiningTarget = null;
    hideTargetMarker();

    const grid = [];
    for (let y = 0; y < state.mapHeight; y++) {
        grid[y] = [];
        for (let x = 0; x < state.mapWidth; x++) {
            if (x === 0 || x === state.mapWidth - 1 || y === 0 || y === state.mapHeight - 1) {
                grid[y][x] = { char: '#', type: 'WALL', color: '#334155' };
            } else {
                grid[y][x] = { char: '.', type: 'FLOOR', color: '#1e293b' };
            }
        }
    }

    if (sectorId === 0) {
        // LOBBY MAP GENERATION
        state.player.x = 12;
        state.player.y = 10;

        // Place Buildings
        placeBuilding(grid, 3, 3, 'E', '입 구', '#38bdf8', 'ENTRANCE');
        placeBuilding(grid, 19, 3, 'S', '판 매', '#f59e0b', 'MARKET');
        placeBuilding(grid, 3, 13, 'B', '상 점', '#10b981', 'SHOP');
        placeBuilding(grid, 19, 13, 'A', '재 단', '#c084fc', 'ALTAR');
        placeBuilding(grid, 11, 2, 'D', '도 감', '#34d399', 'CODEX');

    } else {
        // CAVERN MAP GENERATION FOR SECTORS 1~20
        state.player.x = 2;
        state.player.y = Math.floor(state.mapHeight / 2);

        const sectorInfo = SECTOR_DATA[sectorId];

        for (let y = 1; y < state.mapHeight - 1; y++) {
            for (let x = 1; x < state.mapWidth - 1; x++) {
                if (x <= 3 && Math.abs(y - state.player.y) <= 2) continue;

                const rand = Math.random();
                if (rand < 0.60) {
                    const oreRand = Math.random();
                    let cumulative = 0;
                    let selectedOre = null;

                    for (const ore of sectorInfo.ores) {
                        cumulative += ore.rate;
                        if (oreRand <= cumulative) {
                            selectedOre = ore;
                            break;
                        }
                    }

                    if (selectedOre) {
                        grid[y][x] = {
                            char: selectedOre.char,
                            type: 'ORE',
                            color: selectedOre.color,
                            oreData: selectedOre,
                            hp: selectedOre.hp,
                            maxHp: selectedOre.hp
                        };
                    } else {
                        grid[y][x] = { char: '#', type: 'WALL', color: '#475569' };
                    }
                }
            }
        }
    }

    state.mapGrid = grid;
    updateUIHeaderAndInfo();
    renderMap();
}

function placeBuilding(grid, startX, startY, symbol, nameLabel, color, buildingType) {
    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            const bx = startX + dx;
            const by = startY + dy;
            if (dx === 1 && dy === 1) {
                grid[by][bx] = { char: symbol, type: 'BUILDING', buildingType: buildingType, color: color, name: nameLabel };
            } else {
                grid[by][bx] = { char: '+', type: 'BUILDING_WALL', buildingType: buildingType, color: color };
            }
        }
    }
}

export { generateMap, placeBuilding };
