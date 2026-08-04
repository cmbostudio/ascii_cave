// PixiJS 렌더링 엔진: 캔버스 초기화, 타일 스프라이트, 맵 렌더링
import { state, TILE_SIZE } from '../state.js';

let pixiApp, mapContainer, tileSprites = [], targetMarkerSprite = null;

function initPixiEngine() {
    const containerEl = document.getElementById('game-canvas-container');
    const width = state.mapWidth * TILE_SIZE;
    const height = state.mapHeight * TILE_SIZE;

    pixiApp = new PIXI.Application({
        width: width,
        height: height,
        backgroundColor: 0x090d16,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });

    containerEl.appendChild(pixiApp.view);

    mapContainer = new PIXI.Container();
    pixiApp.stage.addChild(mapContainer);

    // Setup Target Click Indicator
    targetMarkerSprite = new PIXI.Text('┌ ┐\n└ ┘', {
        fontFamily: 'JetBrains Mono',
        fontSize: 14,
        fill: 0x38bdf8,
        align: 'center'
    });
    targetMarkerSprite.anchor.set(0.5);
    targetMarkerSprite.visible = false;
    pixiApp.stage.addChild(targetMarkerSprite);

    // Tile Sprites Matrix Initialization
    for (let y = 0; y < state.mapHeight; y++) {
        tileSprites[y] = [];
        for (let x = 0; x < state.mapWidth; x++) {
            const txt = new PIXI.Text('.', {
                fontFamily: 'JetBrains Mono',
                fontSize: 18,
                fill: 0x475569,
                align: 'center'
            });
            txt.anchor.set(0.5);
            txt.position.set(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
            mapContainer.addChild(txt);
            tileSprites[y][x] = txt;
        }
    }

    // Click / Touch Event Listener on Canvas
    pixiApp.view.addEventListener('pointerdown', (e) => {
        const rect = pixiApp.view.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const gridX = Math.floor(clickX / TILE_SIZE);
        const gridY = Math.floor(clickY / TILE_SIZE);

        if (gridX >= 0 && gridX < state.mapWidth && gridY >= 0 && gridY < state.mapHeight) {
            state.targetPos = { x: gridX, y: gridY };
            targetMarkerSprite.position.set(gridX * TILE_SIZE + TILE_SIZE / 2, gridY * TILE_SIZE + TILE_SIZE / 2);
            targetMarkerSprite.visible = true;
        }
    });
}

function renderMap() {
    if (!state.mapGrid || state.mapGrid.length === 0) return;

    for (let y = 0; y < state.mapHeight; y++) {
        for (let x = 0; x < state.mapWidth; x++) {
            const sprite = tileSprites[y][x];
            const cell = state.mapGrid[y][x];

            if (x === state.player.x && y === state.player.y) {
                sprite.text = '@';
                sprite.style.fill = 0xffffff;
                sprite.style.fontWeight = 'bold';
            } else {
                sprite.text = cell.char;
                sprite.style.fill = cell.color || 0x94a3b8;
                sprite.style.fontWeight = 'normal';
            }
        }
    }

    document.getElementById('player-coords').innerText = `X: ${state.player.x}, Y: ${state.player.y}`;
}

/* 다른 모듈에서 타겟 마커를 직접 다루지 않고 이 헬퍼를 통해 숨기도록 캡슐화 */
function hideTargetMarker() {
    if (targetMarkerSprite) targetMarkerSprite.visible = false;
}

export { initPixiEngine, renderMap, hideTargetMarker };
