// 7. 스킬(Skill) 모달: 패시브 스킬 레벨업 & 액티브 스킬 해금
import { state } from '../../state.js';
import { SKILL_PASSIVES, SKILL_ACTIVES } from '../../data/skills.js';
import { addLog } from '../log.js';
import { updateUIHeaderAndInfo } from '../header.js';
import { getActiveCooldownRemaining } from '../../engine/skills.js';

function openSkillModal() {
    renderSkillPassives();
    renderSkillActives();
    document.getElementById('modal-skill').classList.remove('hidden');
}

function renderSkillPassives() {
    const container = document.getElementById('skill-content-passives');
    container.innerHTML = '';

    SKILL_PASSIVES.forEach(sk => {
        const currentLv = state.skills.passives[sk.id] || 0;
        const isMax = sk.maxLv && currentLv >= sk.maxLv;
        const cost = Math.floor(sk.baseCost * Math.pow(sk.costMult, currentLv));
        const canAfford = state.gold >= cost;

        const card = document.createElement('div');
        card.className = "p-3 bg-slate-950 rounded border border-slate-800 text-xs flex justify-between items-center";
        card.innerHTML = `
            <div>
                <div class="font-bold text-slate-200 mb-0.5">${sk.name} <span class="text-rose-400 font-mono">(Lv.${currentLv}${sk.maxLv ? '/' + sk.maxLv : ''})</span></div>
                <div class="text-[11px] text-slate-400 mb-1">${sk.desc}</div>
                <div class="text-[10px] text-slate-500">현재 효과: +${(currentLv * sk.effect * 100).toFixed(0)}${sk.unit}</div>
            </div>
            <div>
                <button class="btn-buy-skill terminal-btn px-3 py-1.5 rounded font-bold text-xs ${
                    isMax
                    ? 'text-slate-600 border-slate-800 cursor-not-allowed'
                    : canAfford
                        ? 'text-rose-400 border-rose-500/50 hover:bg-rose-950/40'
                        : 'text-slate-500 border-slate-800 cursor-not-allowed'
                }" ${isMax || !canAfford ? 'disabled' : ''}>
                    ${isMax ? '최대 레벨' : `$${cost.toLocaleString()} 습득`}
                </button>
            </div>
        `;

        if (!isMax && canAfford) {
            card.querySelector('.btn-buy-skill').onclick = () => {
                state.gold -= cost;
                state.skills.passives[sk.id] = (state.skills.passives[sk.id] || 0) + 1;
                addLog(`<span class="text-rose-400">[스킬 습득] ${sk.name} (Lv.${state.skills.passives[sk.id]}) 완료!</span>`);
                updateUIHeaderAndInfo();
                renderSkillPassives();
            };
        }

        container.appendChild(card);
    });
}

function renderSkillActives() {
    const container = document.getElementById('skill-content-actives');
    container.innerHTML = '';

    SKILL_ACTIVES.forEach(sk => {
        const isUnlocked = !!state.skills.activeUnlocked[sk.id];
        const canAfford = state.gold >= sk.unlockCost;
        const cooldownLeft = getActiveCooldownRemaining(sk.id);

        const card = document.createElement('div');
        card.className = "p-3 bg-slate-950 rounded border border-slate-800 text-xs flex justify-between items-center";
        card.innerHTML = `
            <div>
                <div class="font-bold text-slate-200 mb-0.5">${sk.name_key} ${sk.name} ${isUnlocked ? '<span class="text-emerald-400 text-[10px]">[해금됨]</span>' : ''}</div>
                <div class="text-[11px] text-slate-400 mb-1">${sk.desc}</div>
                <div class="text-[10px] text-slate-500">쿨다운: ${sk.cooldown}초 ${sk.duration ? `| 지속시간: ${sk.duration}초` : ''}</div>
                ${isUnlocked ? `<div class="text-[10px] mt-0.5 ${cooldownLeft > 0 ? 'text-amber-400' : 'text-emerald-400'}">${cooldownLeft > 0 ? `재사용 대기: ${cooldownLeft.toFixed(1)}초` : '사용 가능 (게임 화면에서 숫자키로 발동)'}</div>` : ''}
            </div>
            <div>
                <button class="btn-buy-active-skill terminal-btn px-3 py-1.5 rounded font-bold text-xs ${
                    isUnlocked
                    ? 'text-emerald-400 border-emerald-500/30 cursor-default'
                    : canAfford
                        ? 'text-rose-400 border-rose-500/50 hover:bg-rose-950/40'
                        : 'text-slate-500 border-slate-800 cursor-not-allowed'
                }" ${isUnlocked || !canAfford ? 'disabled' : ''}>
                    ${isUnlocked ? '해금 완료' : `$${sk.unlockCost.toLocaleString()} 해금`}
                </button>
            </div>
        `;

        if (!isUnlocked && canAfford) {
            card.querySelector('.btn-buy-active-skill').onclick = () => {
                state.gold -= sk.unlockCost;
                state.skills.activeUnlocked[sk.id] = true;
                addLog(`<span class="text-emerald-400 font-bold">[액티브 스킬 해금] ${sk.name}! 게임 화면에서 ${sk.name_key} 키로 사용할 수 있습니다.</span>`);
                updateUIHeaderAndInfo();
                renderSkillActives();
            };
        }

        container.appendChild(card);
    });
}

// 스킬 창이 열려 있는 동안 쿨다운 표시를 주기적으로 갱신
setInterval(() => {
    const modal = document.getElementById('modal-skill');
    if (modal && !modal.classList.contains('hidden')) {
        renderSkillActives();
    }
}, 500);

export { openSkillModal, renderSkillPassives, renderSkillActives };
