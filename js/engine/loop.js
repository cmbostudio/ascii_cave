// 메인 게임 루프 & 키보드 입력 처리
import { state } from '../state.js';
import { getCalculatedSpeed } from './stats.js';
import { hideTargetMarker } from './renderer.js';
import { tryMovePlayer, handleDroneMining } from './mining.js';

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
        activeKeys[e.key.toLowerCase()] = true;
        processKeyboardInput();
    });
    window.addEventListener('keyup', (e) => {
        activeKeys[e.key.toLowerCase()] = false;
    });
}

export { gameLoop, setupKeyboardListeners };
