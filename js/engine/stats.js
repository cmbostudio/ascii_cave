// 플레이어 스탯 & 장비 효과 계산 (속도, 채굴력, 가방 용량 등)
import { state } from '../state.js';

function getCalculatedSpeed() {
    let speed = state.player.baseSpeed + (state.upgrades.speed * 1.0);
    if (state.items.item_boots) speed += 2.0;
    if (state.items.item_overclock) speed += 3.0;
    if (state.items.item_god_pickaxe) speed += 1.5;
    return speed;
}

// 중후반 장비의 DMG 보너스는 "고정 수치 덧셈"이 아니라 "% 배율"로 적용된다.
// (이유: 고정 수치는 현재 DMG가 낮을 때 사면 수십~수백 배씩 즉시 튀어올라
//  수입도 같은 비율로 폭증 -> 다음(훨씬 비싼) 장비도 순식간에 사버리는
//  눈덩이(스노우볼) 연쇄가 발생했음. %는 "지금 DMG의 몇 % 추가"이므로
//  구매 시점의 절대 수치와 무관하게 상승폭이 항상 일정 비율로 제한된다.)
const ITEM_DMG_PCT = {
    item_dynamite: 0.06,     // +6%
    item_nano_glove: 0.10,   // +10%
    item_overclock: 0.12,    // +12%
    item_ether_radar: 0.12,  // +12%
    item_alchemy_bag: 0.12,  // +12%
    item_god_pickaxe: 0.15,  // +15%
    item_hyper_drill: 0.18   // +18%
};

function getCalculatedMiningDMG() {
    let dmg = 1 + (state.upgrades.dmg * 2);

    // 초반 장비(횃불/드릴)는 절대값이 작아 스노우볼을 일으키지 않으므로 그대로 고정 수치 유지
    if (state.items.item_torch) dmg += 5;
    if (state.items.item_drill) dmg += 30;

    // 중후반 장비: % 배율로 누적 적용 (구매 순서와 무관하게 항상 일정 비율만 상승)
    let mult = 1;
    for (const itemId in ITEM_DMG_PCT) {
        if (state.items[itemId]) mult *= (1 + ITEM_DMG_PCT[itemId]);
    }
    dmg = dmg * mult;

    if (state.etherPerks.ether_dmg) {
        dmg = dmg * (1 + state.etherPerks.ether_dmg * 0.25);
    }
    return Math.floor(dmg);
}

function getMaxBagCapacity() {
    let cap = 20 + (state.upgrades.bag * 10);
    if (state.items.item_magnet) cap += 20; 
    if (state.items.item_alchemy_bag) cap += 50;

    if (state.etherPerks.ether_bag) {
        cap += state.etherPerks.ether_bag * 10;
    }
    return cap;
}

function getInventoryCount() {
    let total = 0;
    for (let k in state.inventory) {
        total += state.inventory[k];
    }
    return total;
}

function getTotalMinedCount() {
    let sum = 0;
    for (let k in state.stats.totalMined) {
        sum += state.stats.totalMined[k];
    }
    return sum;
}

function getDiscoveredOreTypesCount() {
    let count = 0;
    for (let k in state.stats.totalMined) {
        if (state.stats.totalMined[k] > 0) count++;
    }
    return count;
}

/* Check Rebirth Requirement Eligibility */
function canRebirth() {
    const deepest = state.stats.deepestSectorUnlocked || 1;
    return state.gold >= 3000 || deepest >= 4;
}

export {
    getCalculatedSpeed,
    getCalculatedMiningDMG,
    getMaxBagCapacity,
    getInventoryCount,
    getTotalMinedCount,
    getDiscoveredOreTypesCount,
    canRebirth
};
