// 4. 고대의 재단(Altar) 모달: 정화 및 환생, 에테르 특성 수련
// (환생 조건 강제 및 50% 너프된 에테르 획득량 적용)
import { state } from '../../state.js';
import { ALTAR_PERKS } from '../../data/shop.js';
import { calculateRebirthEther } from '../../engine/rebirth.js';
import { canRebirth } from '../../engine/stats.js';
import { addLog } from '../log.js';
import { closeAllModals } from '../modals.js';
import { generateMap } from '../../engine/map.js';
import { updateUIHeaderAndInfo } from '../header.js';

function openAltarModal() {
    renderAltarUI();
    document.getElementById('modal-altar').classList.remove('hidden');
}

function renderAltarUI() {
    const rebirthInfo = calculateRebirthEther();
    const eligible = canRebirth();

    document.getElementById('rebirth-ether-total').innerText = `+${rebirthInfo.total} \u00A5`;
    document.getElementById('rebirth-ether-gain').innerText = `+${rebirthInfo.total} \u00A5`;

    const listEl = document.getElementById('rebirth-breakdown-list');
    listEl.innerHTML = '';

    rebirthInfo.details.forEach(item => {
        const row = document.createElement('div');
        row.className = "flex justify-between items-center";
        row.innerHTML = `<span class="text-slate-400">${item.name}</span><span class="text-purple-300 font-bold">${item.text}</span>`;
        listEl.appendChild(row);
    });

    const rebirthBtn = document.getElementById('btn-do-rebirth');
    const reqMsg = document.getElementById('rebirth-req-msg');

    if (eligible) {
        rebirthBtn.disabled = false;
        rebirthBtn.className = "terminal-btn px-4 py-2 rounded text-xs font-bold text-purple-300 border-purple-500/50 hover:bg-purple-900/40 cursor-pointer";
        if (reqMsg) reqMsg.classList.add('hidden');
    } else {
        rebirthBtn.disabled = true;
        rebirthBtn.className = "terminal-btn px-4 py-2 rounded text-xs font-bold text-slate-500 border-slate-800 cursor-not-allowed";
        if (reqMsg) reqMsg.classList.remove('hidden');
    }

    rebirthBtn.onclick = () => {
        if (!canRebirth()) return;

        const gainedEther = rebirthInfo.total;
        state.ether += gainedEther;
        state.gold = 0;
        state.inventory = {};
        state.upgrades = { bag: 0, dmg: 0, speed: 0, sellPrice: 0 };
        state.purchasedTickets = [1];
        state.stats.totalRebirths = (state.stats.totalRebirths || 0) + 1;

        addLog(`<span class="text-purple-400 font-bold">[환생 성공] 환생을 수행하여 ${gainedEther} 에테르를 획득하였습니다!</span>`);

        closeAllModals();
        generateMap(0);
        updateUIHeaderAndInfo();
    };

    renderAltarPerks();
}

function renderAltarPerks() {
    const listEl = document.getElementById('altar-perks-list');
    listEl.innerHTML = '';

    ALTAR_PERKS.forEach(perk => {
        const currentLv = state.etherPerks[perk.id] || 0;
        const cost = Math.floor(perk.cost * Math.pow(perk.costMult, currentLv));
        const canAfford = state.ether >= cost;

        const card = document.createElement('div');
        card.className = "p-2.5 bg-slate-950 rounded border border-slate-800 text-xs flex justify-between items-center font-mono";
        card.innerHTML = `
            <div>
                <div class="font-bold text-purple-300">${perk.name} <span class="text-slate-400">(Lv.${currentLv})</span></div>
                <div class="text-[11px] text-slate-400">${perk.desc}</div>
            </div>
            <div>
                <button class="btn-buy-perk terminal-btn px-3 py-1.5 rounded font-bold text-xs ${
                    canAfford
                    ? 'text-purple-300 border-purple-500/50 hover:bg-purple-900/40'
                    : 'text-slate-500 border-slate-800 cursor-not-allowed'
                }" ${canAfford ? '' : 'disabled'}>
                    ${cost} \u00A5 수련
                </button>
            </div>
        `;

        if (canAfford) {
            card.querySelector('.btn-buy-perk').onclick = () => {
                state.ether -= cost;
                state.etherPerks[perk.id] = (state.etherPerks[perk.id] || 0) + 1;
                addLog(`<span class="text-purple-300">[에테르 수련] ${perk.name} 레벨 업! (Lv.${state.etherPerks[perk.id]})</span>`);
                updateUIHeaderAndInfo();
                renderAltarUI();
            };
        }

        listEl.appendChild(card);
    });
}

export { openAltarModal, renderAltarUI, renderAltarPerks };
