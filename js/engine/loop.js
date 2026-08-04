// 메인 게임 루프 & 키보드 입력 처리
import { state } from '../state.js';
import { getCalculatedSpeed } from './stats.js';
import { hideTargetMarker } from './renderer.js';
import { tryMovePlayer, handleDroneMining } from './mining.js';
import { tickSkillCooldowns, activateSkill } from './skills.js';

/* Main Game Loop */
let lastTime = performance.now();
function gameLoop(now) {
    const deltaSec = (now - lastTime) / 1000;
    lastTime = now;

    state.player.moveCooldown -= deltaSec;

    if (state.targetPos && state.player.moveCooldown <= 0) {
        const spd = getCalculatedSpeed();
        state.player.moveCooldown = 1 / spd;

        const dx = state.targetPos.x - state.player.x;
        const dy = state.targetPos.y - state.player.y;

        if (dx === 0 && dy === 0) {
            state.targetPos = null;
            hideTargetMarker();
        } else {
            let stepX = 0, stepY = 0;
            if (Math.abs(dx) >= Math.abs(dy)) {
                stepX = dx > 0 ? 1 : -1;
            } else {
                stepY = dy > 0 ? 1 : -1;
            }
            tryMovePlayer(stepX, stepY);
        }
    }

    handleDroneMining(deltaSec);
    tickSkillCooldowns(deltaSec);
    requestAnimationFrame(gameLoop);
}

// Keyboard Event Handling
const activeKeys = {};

function processKeyboardInput() {
    if (state.player.moveCooldown > 0) return;

    let dx = 0, dy = 0;
    if (activeKeys['w'] || activeKeys['arrowup']) dy = -1;
    else if (activeKeys['s'] || activeKeys['arrowdown']) dy = 1;
    else if (activeKeys['a'] || activeKeys['arrowleft']) dx = -1;
    else if (activeKeys['d'] || activeKeys['arrowright']) dx = 1;

    if (dx !== 0 || dy !== 0) {
        state.targetPos = null;
        hideTargetMarker();

        const spd = getCalculatedSpeed();
        state.player.moveCooldown = 1 / spd;
        tryMovePlayer(dx, dy);
    }
}

function setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        activeKeys[key] = true;

        // 액티브 스킬 발동 핫키 (1: 충격파, 2: 질주, 3: 재물의 축복)
        if (key === '1' || key === '2' || key === '3') {
            const skillIdByKey = { '1': 'skill_shockwave', '2': 'skill_haste', '3': 'skill_fortune' };
            activateSkill(skillIdByKey[key]);
            return;
        }

        processKeyboardInput();
    });
    window.addEventListener('keyup', (e) => {
        activeKeys[e.key.toLowerCase()] = false;
    });
}

export { gameLoop, setupKeyboardListeners };
