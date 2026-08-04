// 5. 광물 도감(Codex) 모달: 채굴 기록 및 수집 현황
import { state } from '../../state.js';
import { SECTOR_DATA } from '../../data/sectors.js';
import { getTotalMinedCount, getDiscoveredOreTypesCount } from '../../engine/stats.js';

function openCodexModal() {
    renderCodexUI();
    document.getElementById('modal-codex').classList.remove('hidden');
}

function renderCodexUI() {
    const totalMinedSum = getTotalMinedCount();
    const discoveredTypes = getDiscoveredOreTypesCount();

    let grandTotalOresInGame = 0;
    SECTOR_DATA.forEach(s => grandTotalOresInGame += s.ores.length);

    document.getElementById('codex-stat-discovered').innerText = `${discoveredTypes} / ${grandTotalOresInGame}종`;
    document.getElementById('codex-stat-total-mined').innerText = `${totalMinedSum.toLocaleString()}개`;

    const filtersContainer = document.getElementById('codex-sector-filters');
    filtersContainer.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = `shrink-0 px-2.5 py-1 rounded text-[11px] font-bold border transition ${
        state.codexSectorFilter === 0
        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60'
        : 'terminal-btn text-slate-400'
    }`;
    allBtn.innerText = "전체 구역";
    allBtn.onclick = () => { state.codexSectorFilter = 0; renderCodexUI(); };
    filtersContainer.appendChild(allBtn);

    for (let i = 1; i <= 20; i++) {
        const secBtn = document.createElement('button');
        secBtn.className = `shrink-0 px-2 py-1 rounded text-[11px] font-bold border whitespace-nowrap transition ${
            state.codexSectorFilter === i
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60'
            : 'terminal-btn text-slate-400'
        }`;
        secBtn.innerText = `${i}구역`;
        secBtn.onclick = () => { state.codexSectorFilter = i; renderCodexUI(); };
        filtersContainer.appendChild(secBtn);
    }

    const gridEl = document.getElementById('codex-ores-grid');
    gridEl.innerHTML = '';

    SECTOR_DATA.forEach(sec => {
        if (sec.id === 0) return;
        if (state.codexSectorFilter !== 0 && state.codexSectorFilter !== sec.id) return;

        sec.ores.forEach(ore => {
            const minedCount = state.stats.totalMined[ore.name] || 0;
            const isDiscovered = minedCount > 0;

            const card = document.createElement('div');
            card.className = `p-2.5 rounded border flex flex-col justify-between font-mono ${
                isDiscovered
                ? 'bg-slate-900 border-slate-700/80 hover:border-emerald-500/50'
                : 'bg-slate-950/60 border-slate-800/80 opacity-60'
            }`;

            let masteryBadge = '';
            if (minedCount >= 200) masteryBadge = '<span class="text-[10px] px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">골드</span>';
            else if (minedCount >= 50) masteryBadge = '<span class="text-[10px] px-1 rounded bg-slate-400/20 text-slate-300 border border-slate-400/40">실버</span>';
            else if (minedCount >= 10) masteryBadge = '<span class="text-[10px] px-1 rounded bg-amber-700/20 text-amber-500 border border-amber-700/40">브론즈</span>';

            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-1">
                        <div class="flex items-center gap-1.5 font-bold">
                            <span style="color: ${isDiscovered ? ore.color : '#64748b'}">${isDiscovered ? ore.char : '?'}</span>
                            <span class="${isDiscovered ? 'text-slate-100' : 'text-slate-500'}">
                                ${isDiscovered ? ore.name : '??? 미발견 광석'}
                            </span>
                        </div>
                        ${masteryBadge}
                    </div>
                    <div class="text-[10px] text-slate-400 mb-1.5">${sec.name}</div>
                </div>
                <div class="border-t border-slate-800/80 pt-1.5 flex justify-between items-center text-[11px]">
                    <span class="text-slate-400">총 채굴한 수:</span>
                    <span class="font-bold ${isDiscovered ? 'text-amber-400' : 'text-slate-600'}">
                        ${minedCount.toLocaleString()}개
                    </span>
                </div>
            `;
            gridEl.appendChild(card);
        });
    });
}

export { openCodexModal, renderCodexUI };