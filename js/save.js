// localStorage 기반 저장 / 불러오기
import { state } from './state.js';

const SAVE_KEY = 'ascii_cave_save';

function saveGame() {
    try {
        const data = {
            gold: state.gold,
            ether: state.ether,
            purchasedTickets: state.purchasedTickets,
            upgrades: state.upgrades,
            items: state.items,
            etherPerks: state.etherPerks,
            inventory: state.inventory,
            stats: state.stats
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Save failed:", e);
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            state.gold = data.gold || 0;
            state.ether = data.ether || 0;
            state.purchasedTickets = data.purchasedTickets || [1];
            state.upgrades = data.upgrades || { bag: 0, dmg: 0, speed: 0, sellPrice: 0 };
            state.items = data.items || {};
            state.etherPerks = data.etherPerks || { ether_dmg: 0, ether_bag: 0, ether_price: 0 };
            state.inventory = data.inventory || {};
            state.stats = data.stats || { totalMined: {}, totalGoldEarned: 0, totalRebirths: 0, deepestSectorUnlocked: 1 };
        }
    } catch (e) {
        console.error("Load failed:", e);
    }
}

export { saveGame, loadGame, SAVE_KEY };
