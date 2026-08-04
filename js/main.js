// 진입점(Entry Point): 모든 모듈을 초기화하고 게임을 시작합니다.
import { loadGame, saveGame } from './save.js';
import { initPixiEngine } from './engine/renderer.js';
import { setupEventListeners } from './events.js';
import { setupKeyboardListeners, gameLoop } from './engine/loop.js';
import { generateMap } from './engine/map.js';
import { updateUIHeaderAndInfo } from './ui/header.js';

// Auto save every 30 seconds
setInterval(saveGame, 30000);

function startGame() {
    loadGame();
    initPixiEngine();
    setupEventListeners();
    setupKeyboardListeners();
    generateMap(0);
    updateUIHeaderAndInfo();
    requestAnimationFrame(gameLoop);
}

window.onload = startGame;
