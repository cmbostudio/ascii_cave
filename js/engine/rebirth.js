// 환생(Rebirth) 시 획득하는 에테르 계산 시스템 (50% 너프 적용됨)
import { state } from '../state.js';
import { getTotalMinedCount, getDiscoveredOreTypesCount } from './stats.js';

function calculateRebirthEther() {
    let details = [];

    let baseEther = 1;
    details.push({ name: "기본 환생 보너스", value: 1, text: "+1 &yen;" });

    let goldEther = Math.floor(state.gold / 5000);
    if (goldEther > 0) {
        details.push({ name: `보유 골드 수확 ($${state.gold.toLocaleString()})`, value: goldEther, text: `+${goldEther} &yen;` });
    }

    let totalMined = getTotalMinedCount();
    let minedEther = Math.floor(totalMined / 15);
    if (minedEther > 0) {
        details.push({ name: `누적 채굴량 실적 (${totalMined.toLocaleString()}개)`, value: minedEther, text: `+${minedEther} &yen;` });
    }

    let discoveredTypes = getDiscoveredOreTypesCount();
    let codexEther = Math.floor(discoveredTypes / 2);
    if (codexEther > 0) {
        details.push({ name: `도감 광물 수집 (${discoveredTypes}종 발견)`, value: codexEther, text: `+${codexEther} &yen;` });
    }

    let deepest = state.stats.deepestSectorUnlocked || 1;
    let sectorEther = (deepest - 1) * 2;
    if (sectorEther > 0) {
        details.push({ name: `최고 달성 광산 구역 (${deepest}구역)`, value: sectorEther, text: `+${sectorEther} &yen;` });
    }

    let ownedItemsCount = 0;
    for (let k in state.items) { if (state.items[k]) ownedItemsCount++; }
    let itemEther = ownedItemsCount * 1;
    if (itemEther > 0) {
        details.push({ name: `보유 중인 특수 장비 (${ownedItemsCount}개)`, value: itemEther, text: `+${itemEther} &yen;` });
    }

    let subtotal = baseEther + goldEther + minedEther + codexEther + sectorEther + itemEther;

    let multiplier = 1.0;
    if (state.items.item_ether_radar) {
        multiplier = 1.25;
        details.push({ name: "[장비 보너스] 에테르 공명 센서", value: 0, text: "+25% 증폭" });
    }

    // Apply 50% nerf to total calculated ether
    let finalEther = Math.max(1, Math.floor(subtotal * multiplier * 0.5));
    return { total: finalEther, details: details };
}

export { calculateRebirthEther };
