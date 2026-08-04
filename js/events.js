// 상단 헤더 버튼, 모달 닫기, 상점 탭, 저장/초기화 버튼 등 전역 이벤트 바인딩
import { generateMap } from './engine/map.js';
import { addLog } from './ui/log.js';
import { closeAllModals } from './ui/modals.js';
import { saveGame, SAVE_KEY } from './save.js';

function setupEventListeners() {
    // Return Lobby Button
    document.getElementById('btn-return-lobby').onclick = () => {
        generateMap(0);
        addLog(`<span class="text-amber-400">로비로 복귀하였습니다.</span>`);
    };

    // Settings Button
    document.getElementById('btn-settings').onclick = () => {
        document.getElementById('modal-settings').classList.remove('hidden');
    };

    // Modal Close Buttons
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.onclick = closeAllModals;
    });

    // Shop Tabs
    const tabUpg = document.getElementById('shop-tab-upgrades');
    const tabItems = document.getElementById('shop-tab-items');
    const contentUpg = document.getElementById('shop-content-upgrades');
    const contentItems = document.getElementById('shop-content-items');

    if (tabUpg && tabItems) {
        tabUpg.onclick = () => {
            tabUpg.className = "px-4 py-1.5 text-xs font-bold border-b-2 border-emerald-400 text-emerald-400";
            tabItems.className = "px-4 py-1.5 text-xs font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
            contentUpg.classList.remove('hidden');
            contentItems.classList.add('hidden');
        };

        tabItems.onclick = () => {
            tabItems.className = "px-4 py-1.5 text-xs font-bold border-b-2 border-emerald-400 text-emerald-400";
            tabUpg.className = "px-4 py-1.5 text-xs font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
            contentItems.classList.remove('hidden');
            contentUpg.classList.add('hidden');
        };
    }

    // Save & Reset Buttons
    document.getElementById('btn-save-game').onclick = () => {
        saveGame();
        addLog(`<span class="text-sky-400">게임이 성공적으로 저장되었습니다.</span>`);
    };

    document.getElementById('btn-reset-game').onclick = () => {
        if (confirm("정말로 모든 진행 데이터를 초기화하시겠습니까?")) {
            localStorage.removeItem(SAVE_KEY);
            location.reload();
        }
    };
}

export { setupEventListeners };
