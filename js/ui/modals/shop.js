// 3. 상점(Shop) 모달: 기본 능력 강화 & 특수 장비 구매
import { state } from '../../state.js';
import { SHOP_UPGRADES, SHOP_ITEMS } from '../../data/shop.js';
import { addLog } from '../log.js';
import { updateUIHeaderAndInfo } from '../header.js';

function openShopModal() {
    renderShopUpgrades();
    renderShopItems();
    document.getElementById('modal-shop').classList.remove('hidden');
}

function renderShopUpgrades() {
    const container = document.getElementById('shop-content-upgrades');
    container.innerHTML = '';

    SHOP_UPGRADES.forEach(upg => {
        const currentLv = state.upgrades[upg.id] || 0;
        const isMax = upg.maxLv && currentLv >= upg.maxLv;
        const cost = Math.floor(upg.baseCost * Math.pow(upg.costMult, currentLv));

        const card = document.createElement('div');
        card.className = "p-3 bg-slate-950 rounded border border-slate-800 text-xs flex justify-between items-center";

        card.innerHTML = `
            <div>
                <div class="font-bold text-slate-200 mb-0.5">${upg.name} <span class="text-emerald-400 font-mono">(Lv.${currentLv}${upg.maxLv ? '/' + upg.maxLv : ''})</span></div>
                <div class="text-[11px] text-slate-400 mb-1">${upg.desc}</div>
                <div class="text-[10px] text-slate-500">현재 효과: +${(currentLv * upg.effect).toFixed(1)}${upg.unit}</div>
            </div>
            <div>
                <button class="btn-buy-upg terminal-btn px-3 py-1.5 rounded font-bold text-xs ${
                    isMax
                    ? 'text-slate-600 border-slate-800 cursor-not-allowed'
                    : state.gold >= cost
                        ? 'text-emerald-400 border-emerald-500/50 hover:bg-emerald-950/40'
                        : 'text-slate-500 border-slate-800 cursor-not-allowed'
                }" ${isMax || state.gold < cost ? 'disabled' : ''}>
                    ${isMax ? '최대 레벨' : `$${cost.toLocaleString()} 강화`}
                </button>
            </div>
        `;

        if (!isMax && state.gold >= cost) {
            card.querySelector('.btn-buy-upg').onclick = () => {
                state.gold -= cost;
                state.upgrades[upg.id] = (state.upgrades[upg.id] || 0) + 1;
                addLog(`<span class="text-emerald-400">[강화 성공] ${upg.name} (Lv.${state.upgrades[upg.id]}) 완료!</span>`);
                updateUIHeaderAndInfo();
                renderShopUpgrades();
            };
        }

        container.appendChild(card);
    });
}

function renderShopItems() {
    const container = document.getElementById('shop-content-items');
    container.innerHTML = '';

    SHOP_ITEMS.forEach(item => {
        const isOwned = !!state.items[item.id];
        const canAfford = state.gold >= item.price;

        const card = document.createElement('div');
        card.className = "p-3 bg-slate-950 rounded border border-slate-800 text-xs flex justify-between items-center";
        card.innerHTML = `
            <div>
                <div class="font-bold text-slate-200 mb-0.5">${item.name}</div>
                <div class="text-[11px] text-slate-400">${item.desc}</div>
            </div>
            <div>
                <button class="btn-buy-item terminal-btn px-3 py-1.5 rounded font-bold text-xs ${
                    isOwned
                    ? 'text-sky-400 border-sky-500/30 cursor-default'
                    : canAfford
                        ? 'text-amber-400 border-amber-500/50 hover:bg-amber-950/40'
                        : 'text-slate-500 border-slate-800 cursor-not-allowed'
                }" ${isOwned || !canAfford ? 'disabled' : ''}>
                    ${isOwned ? '보유 중' : `$${item.price.toLocaleString()} 구매`}
                </button>
            </div>
        `;

        if (!isOwned && canAfford) {
            card.querySelector('.btn-buy-item').onclick = () => {
                state.gold -= item.price;
                state.items[item.id] = true;
                addLog(`<span class="text-sky-400">[장비 구매] ${item.name}을(를) 획득하였습니다!</span>`);
                updateUIHeaderAndInfo();
                renderShopItems();
            };
        }

        container.appendChild(card);
    });
}

export { openShopModal, renderShopUpgrades, renderShopItems };
