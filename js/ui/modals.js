// 모든 모달 창 공통 제어 (닫기)
function closeAllModals() {
    const modals = ['modal-entrance', 'modal-market', 'modal-shop', 'modal-altar', 'modal-codex', 'modal-settings'];
    modals.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
}

export { closeAllModals };
