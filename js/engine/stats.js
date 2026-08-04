// 플레이어 스탯 & 장비 효과 계산 (속도, 채굴력, 가방 용량 등)
import { state } from '../state.js';

function getCalculatedSpeed() {
    let speed = state.player.baseSpeed + (state.upgrades.speed * 1.0);
    if (state.items.item_boots) speed += 2.0;
    if (state.items.item_overclock) speed += 3.0;
    if (state.items.item_god_pickaxe) speed += 1.5;
    return speed;
}

function getCalculatedMiningDMG() {
    let dmg = 1 + (state.upgrades.dmg * 2);

    // Equipment Items DMG Additions
    if (state.items.item_torch) dmg += 5;
    if (state.items.item_drill) dmg += 25;
    if (state.items.item_nano_glove) dmg += 15;
    if (state.items.item_overclock) dmg += 10;
    if (state.items.item_god_pickaxe) dmg += 100;
    if (state.items.item_hyper_drill) dmg += 300;

    // Ether perk multiplier (50% nerfed)
    if (state.etherPerks.ether_dmg) {
        dmg = Math.floor(dmg * (1 + state.etherPerks.ether_dmg * 0.25));
    }
    return dmg;
}

function getMaxBagCapacity() {
    let cap = 20 + (state.upgrades.bag * 10);
    if (state.items.item_magnet) cap += 15;
    if (state.items.item_alchemy_bag) cap += 30;

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
