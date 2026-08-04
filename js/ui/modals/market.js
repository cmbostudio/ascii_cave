// 2. 판매 거래소(Market) 모달: 인벤토리 자원 매각
import { state } from '../../state.js';
import { SECTOR_DATA } from '../../data/sectors.js';
import { addLog } from '../log.js';
import { updateUIHeaderAndInfo } from '../header.js';

function openMarketModal() {
    const listEl = document.getElementById('market-sell-list');
    listEl.innerHTML = '';

    let totalValue = 0;
    let multiplier = 1 + (state.upgrades.sellPrice * 0.25);
    if (state.items.item_scanner) multiplier += 0.5;
    if (state.items.item_alchemy_bag) multiplier += 0.3;
    if (state.etherPerks.ether_price) multiplier += state.etherPerks.ether_price * 0.5;

    let hasItemToSell = false;
    for (let oreName in state.inventory) {
        const count = state.inventory[oreName];
        if (count > 0) {
            hasItemToSell = true;
            let baseVal = 10;
            for (let sec of SECTOR_DATA) {
                const found = sec.ores.find(o => o.name === oreName);
                if (found) { baseVal = found.val; break; }
            }

            const unitPrice = Math.floor(baseVal * multiplier);
            const itemTotal = unitPrice * count;
            totalValue += itemTotal;

            const row = document.createElement('div');
            row.className = "flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800";
            row.innerHTML = `
                <div>
                    <span class="font-bold text-slate-200">${oreName}</span>
                    <span class="text-slate-500 text-[10px] ml-1">($${unitPrice}/개)</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-slate-400">${count}개</span>
                    <span class="text-amber-400 font-bold font-mono">$${itemTotal.toLocaleString()}</span>
                </div>
            `;
            listEl.appendChild(row);
        }
    }

    if (!hasItemToSell) {
        listEl.innerHTML = '<div class="text-slate-500 text-center py-6">판매할 광석이 인벤토리에 없습니다.</div>';
    }

    document.getElementById('market-total-value').innerText = `$${totalValue.toLocaleString()}`;

    const sellBtn = document.getElementById('btn-sell-all');
    sellBtn.onclick = () => {
        if (totalValue > 0) {
            state.gold += totalValue;
            state.stats.totalGoldEarned += totalValue;
            state.inventory = {};
            addLog(`<span class="text-amber-400">[매각 완료] 모든 광석을 판매하여 $${totalValue.toLocaleString()} 골드를 획득하였습니다!</span>`);
            updateUIHeaderAndInfo();
            openMarketModal();
        }
    };

    document.getElementById('modal-market').classList.remove('hidden');
}

export { openMarketModal };
