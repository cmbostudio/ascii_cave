// 인벤토리 & 보유 장비 UI 갱신
import { state } from '../state.js';
import { SHOP_ITEMS } from '../data/shop.js';
import { getInventoryCount, getMaxBagCapacity } from '../engine/stats.js';

function updateInventoryUI() {
    const count = getInventoryCount();
    const cap = getMaxBagCapacity();
    document.getElementById('bag-capacity-text').innerText = `${count} / ${cap}`;

    const percent = Math.min(100, Math.floor((count / cap) * 100));
    document.getElementById('bag-progress-bar').style.width = percent + '%';

    const listEl = document.getElementById('inventory-list');
    listEl.innerHTML = '';

    let hasItems = false;
    for (let oreName in state.inventory) {
        const cnt = state.inventory[oreName];
        if (cnt > 0) {
            hasItems = true;
            const row = document.createElement('div');
            row.className = "flex items-center justify-between bg-slate-950 p-1.5 rounded border border-slate-800/80";
            row.innerHTML = `<span class="text-slate-300">${oreName}</span><span class="text-amber-400 font-bold">${cnt}개</span>`;
            listEl.appendChild(row);
        }
    }

    if (!hasItems) {
        listEl.innerHTML = '<div class="text-slate-500 text-center py-4">비어 있음</div>';
    }
}

function updateEquipmentUI() {
    const listEl = document.getElementById('equipment-list');
    listEl.innerHTML = '';

    let count = 0;
    for (const item of SHOP_ITEMS) {
        if (state.items[item.id]) {
            count++;
            const row = document.createElement('div');
            row.className = "bg-slate-950 p-1.5 rounded border border-slate-800 text-[11px] text-sky-300 flex items-center justify-between";
            row.innerHTML = `<span>[*] ${item.name}</span><span class="text-slate-500">장착중</span>`;
            listEl.appendChild(row);
        }
    }

    if (count === 0) {
        listEl.innerHTML = '<div class="text-slate-500 text-center py-2">소지한 특수 장비 없음</div>';
    }
}

export { updateInventoryUI, updateEquipmentUI };
