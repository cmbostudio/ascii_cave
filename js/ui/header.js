// 상단 헤더(골드/에테르/스탯) 및 구역 정보 패널 UI 갱신
import { state } from '../state.js';
import { SECTOR_DATA } from '../data/sectors.js';
import { getCalculatedMiningDMG, getCalculatedSpeed } from '../engine/stats.js';
import { updateInventoryUI, updateEquipmentUI } from './inventory.js';

function updateUIHeaderAndInfo() {
    const currentGold = (typeof state.gold === 'number' && !isNaN(state.gold)) ? state.gold : 0;
    const currentEther = (typeof state.ether === 'number' && !isNaN(state.ether)) ? state.ether : 0;

    document.getElementById('stat-gold').innerText = currentGold.toLocaleString();
    document.getElementById('stat-ether').innerText = currentEther.toLocaleString();
    document.getElementById('stat-dmg').innerText = getCalculatedMiningDMG();
    document.getElementById('stat-speed').innerText = getCalculatedSpeed().toFixed(1) + '/초';

    let ownedItemCount = 0;
    for (let k in state.items) { if (state.items[k]) ownedItemCount++; }
    document.getElementById('stat-item-count').innerText = ownedItemCount;

    const returnBtn = document.getElementById('btn-return-lobby');
    const sectorInfo = SECTOR_DATA[state.currentSectorId] || SECTOR_DATA[0];

    if (state.currentSectorId === 0) {
        returnBtn.classList.add('hidden');
        document.getElementById('sector-title').innerText = '로비 (LOBBY)';
        document.getElementById('sector-info-desc').innerText = sectorInfo.desc;
    } else {
        returnBtn.classList.remove('hidden');
        document.getElementById('sector-title').innerText = sectorInfo.name;
        document.getElementById('sector-info-desc').innerText = `${sectorInfo.env} - ${sectorInfo.desc}`;
    }

    updateInventoryUI();
    updateEquipmentUI();
}

export { updateUIHeaderAndInfo };
