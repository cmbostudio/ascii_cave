// 1. 입구(Entrance) 모달: 광산 섹터 선택 및 입장권 구매
// (미보유 구역은 광물 이름이 ??? 로 표시됨)
import { state } from '../../state.js';
import { SECTOR_DATA } from '../../data/sectors.js';
import { closeAllModals } from '../modals.js';
import { generateMap } from '../../engine/map.js';
import { addLog } from '../log.js';
import { updateUIHeaderAndInfo } from '../header.js';

function openEntranceModal() {
    const grid = document.getElementById('sector-grid');
    grid.innerHTML = '';

    const goldEl = document.getElementById('entrance-modal-gold');
    if (goldEl) goldEl.innerText = `$${state.gold.toLocaleString()}`;

    const formatProb = (rate) => {
        const pct = rate * 100;
        if (pct < 0.1) return pct.toFixed(2) + '%';
        if (pct < 1) return pct.toFixed(1) + '%';
        if (Number.isInteger(pct)) return pct.toFixed(0) + '%';
        return pct.toFixed(1) + '%';
    };

    for (let i = 1; i <= 20; i++) {
        const s = SECTOR_DATA[i];
        const hasTicket = state.purchasedTickets && state.purchasedTickets.includes(i);
        const prevSectorHasTicket = i === 1 || (state.purchasedTickets && state.purchasedTickets.includes(i - 1));

        const card = document.createElement('div');
        card.className = `p-3 rounded border text-xs flex flex-col justify-between ${
            hasTicket
            ? 'bg-slate-900/90 border-sky-500/50 hover:border-sky-400'
            : prevSectorHasTicket
                ? 'bg-slate-900/60 border-amber-500/40 hover:border-amber-400'
                : 'bg-slate-950 border-slate-800/80 opacity-60'
        }`;

        let oreRowsHtml = '';
        for (const ore of s.ores) {
            const probPct = formatProb(ore.rate);
            const isUltraRare = ore.rate < 0.01;
            const displayName = hasTicket ? ore.name : "???";

            oreRowsHtml += `
                <tr class="border-b border-slate-800/50 hover:bg-slate-800/30 ${isUltraRare && hasTicket ? 'bg-amber-500/10' : ''}">
                    <td class="py-0.5 px-1 font-bold" style="color: ${hasTicket ? ore.color : '#64748b'}">${hasTicket ? ore.char : '?'}</td>
                    <td class="py-0.5 px-1 text-slate-300 font-semibold truncate ${isUltraRare && hasTicket ? 'text-amber-300' : ''}">
                        ${isUltraRare && hasTicket ? '[★] ' : ''}${displayName}
                    </td>
                    <td class="py-0.5 px-1 text-slate-400 text-center">${ore.hp} HP</td>
                    <td class="py-0.5 px-1 text-amber-400 text-right">$${ore.val.toLocaleString()}</td>
                    <td class="py-0.5 px-1 ${isUltraRare ? 'text-rose-400 font-extrabold' : 'text-sky-300 font-bold'} font-mono text-right">${probPct}</td>
                </tr>
            `;
        }

        let actionBtnHtml = '';
        if (hasTicket) {
            actionBtnHtml = `<button class="btn-enter-sector w-full terminal-btn py-1.5 rounded font-bold text-sky-400 border-sky-500/50 hover:bg-sky-950/40">
                [입장하기]
            </button>`;
        } else if (prevSectorHasTicket) {
            const canAfford = state.gold >= s.ticketPrice;
            actionBtnHtml = `<button class="btn-buy-ticket w-full terminal-btn py-1.5 rounded font-bold ${
                canAfford
                ? 'text-amber-400 border-amber-500/60 hover:bg-amber-950/40'
                : 'text-slate-500 border-slate-700 cursor-not-allowed'
            }" ${canAfford ? '' : 'disabled'}>
                [입장권 구매: $${s.ticketPrice.toLocaleString()}]
            </button>`;
        } else {
            actionBtnHtml = `<button class="w-full terminal-btn py-1.5 rounded font-bold text-slate-600 border-slate-800 cursor-not-allowed" disabled>
                [이전 구역 입장권 필요]
            </button>`;
        }

        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-sm ${hasTicket ? 'text-sky-400' : 'text-slate-200'}">${s.name}</span>
                    ${hasTicket
                        ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">입장권 보유</span>'
                        : `<span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">입장권: $${s.ticketPrice.toLocaleString()}</span>`
                    }
                </div>
                <div class="text-[11px] text-slate-400 mb-2">${s.env} - ${s.desc}</div>

                <div class="bg-slate-950/80 rounded border border-slate-800 p-1.5 mb-3">
                    <div class="text-[10px] font-bold text-slate-400 mb-1 flex justify-between">
                        <span>[광석 출현 확률표]</span>
                        <span class="text-sky-400 font-mono">총 ${s.ores.length}종</span>
                    </div>
                    <table class="w-full text-[10px] font-mono">
                        <thead>
                            <tr class="text-slate-500 border-b border-slate-800 text-left">
                                <th class="p-0.5 font-normal">기호</th>
                                <th class="p-0.5 font-normal">광석명</th>
                                <th class="p-0.5 font-normal text-center">체력</th>
                                <th class="p-0.5 font-normal text-right">가치</th>
                                <th class="p-0.5 font-normal text-right">확률</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${oreRowsHtml}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>${actionBtnHtml}</div>
        `;

        if (hasTicket) {
            card.querySelector('.btn-enter-sector').addEventListener('click', () => {
                closeAllModals();
                generateMap(i);
                addLog(`<span class="text-sky-400">${s.name}에 입장하였습니다.</span>`);
            });
        } else if (prevSectorHasTicket) {
            const buyBtn = card.querySelector('.btn-buy-ticket');
            if (buyBtn && !buyBtn.disabled) {
                buyBtn.addEventListener('click', () => {
                    if (state.gold >= s.ticketPrice) {
                        state.gold -= s.ticketPrice;
                        state.purchasedTickets.push(i);
                        state.stats.deepestSectorUnlocked = Math.max(state.stats.deepestSectorUnlocked || 1, i);
                        addLog(`<span class="text-amber-400">[입장권 구매 성공] ${s.name} 입장권을 구매하였습니다!</span>`);
                        updateUIHeaderAndInfo();
                        openEntranceModal();
                    }
                });
            }
        }

        grid.appendChild(card);
    }

    document.getElementById('modal-entrance').classList.remove('hidden');
}

export { openEntranceModal };
