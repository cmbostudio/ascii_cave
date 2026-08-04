// 스킬(Skill) 엔진: 패시브 효과 계산 + 액티브 스킬 발동/쿨다운/지속시간 처리
import { state } from '../state.js';
import { SKILL_PASSIVES, SKILL_ACTIVES } from '../data/skills.js';
import { renderMap } from './renderer.js';
import { obtainOre } from './mining.js';
import { addLog } from '../ui/log.js';

/* ---------- 패시브 스킬 효과 ---------- */

function getSkillCritChance() {
    const lv = state.skills.passives.skill_crit || 0;
    const def = SKILL_PASSIVES.find(s => s.id === 'skill_crit');
    return lv * (def ? def.effect : 0);
}

function getSkillLuckChance() {
    const lv = state.skills.passives.skill_luck || 0;
    const def = SKILL_PASSIVES.find(s => s.id === 'skill_luck');
    return lv * (def ? def.effect : 0);
}

function getSkillCooldownMult() {
    const lv = state.skills.passives.skill_cooldown || 0;
    const def = SKILL_PASSIVES.find(s => s.id === 'skill_cooldown');
    const reduction = lv * (def ? def.effect : 0);
    return Math.max(0.3, 1 - reduction); // 최대 70%까지만 감소 가능
}

/* ---------- 액티브 스킬 상태 조회 ---------- */

function getActiveCooldownRemaining(skillId) {
    return state.activeSkillRuntime.cooldowns[skillId] || 0;
}

function isHasteActive() {
    return performance.now() < (state.activeSkillRuntime.hasteUntil || 0);
}

function isFortuneActive() {
    return performance.now() < (state.activeSkillRuntime.fortuneUntil || 0);
}

/* ---------- 액티브 스킬 발동 ---------- */

function activateSkill(skillId) {
    const def = SKILL_ACTIVES.find(s => s.id === skillId);
    if (!def) return;

    if (!state.skills.activeUnlocked[skillId]) {
        addLog(`<span class="text-slate-500">[스킬 미해금] '${def.name}'은(는) 아직 스킬 창에서 해금하지 않았습니다.</span>`);
        return;
    }

    if (state.currentSectorId === 0) {
        addLog(`<span class="text-slate-500">[스킬 사용 불가] 광산 구역에 입장한 상태에서만 사용할 수 있습니다.</span>`);
        return;
    }

    const remaining = getActiveCooldownRemaining(skillId);
    if (remaining > 0) {
        addLog(`<span class="text-slate-500">[쿨다운 중] '${def.name}' 재사용까지 ${remaining.toFixed(1)}초 남았습니다.</span>`);
        return;
    }

    // 효과 적용
    if (skillId === 'skill_shockwave') {
        castShockwave(def);
    } else if (skillId === 'skill_haste') {
        state.activeSkillRuntime.hasteUntil = performance.now() + def.duration * 1000;
        addLog(`<span class="text-emerald-400 font-bold">[스킬 발동] ${def.name}! ${def.duration}초간 이동 속도가 대폭 증가합니다.</span>`);
    } else if (skillId === 'skill_fortune') {
        state.activeSkillRuntime.fortuneUntil = performance.now() + def.duration * 1000;
        addLog(`<span class="text-amber-400 font-bold">[스킬 발동] ${def.name}! ${def.duration}초간 판매 가격이 2배로 증가합니다.</span>`);
    }

    const cd = def.cooldown * getSkillCooldownMult();
    state.activeSkillRuntime.cooldowns[skillId] = cd;
}

function castShockwave(def) {
    const px = state.player.x;
    const py = state.player.y;
    let hitCount = 0;

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = px + dx;
            const ny = py + dy;
            if (nx < 0 || nx >= state.mapWidth || ny < 0 || ny >= state.mapHeight) continue;

            const cell = state.mapGrid[ny][nx];
            if (cell.type === 'ORE') {
                cell.hp -= def.power;
                hitCount++;
                if (cell.hp <= 0) {
                    obtainOre(cell.oreData);
                    state.mapGrid[ny][nx] = { char: '.', type: 'FLOOR', color: '#1e293b' };
                }
            }
        }
    }

    addLog(`<span class="text-rose-400 font-bold">[스킬 발동] ${def.name}! 주변 광물 ${hitCount}개에 ${def.power} 데미지를 가했습니다.</span>`);
    renderMap();
}

/* ---------- 매 프레임 쿨다운 갱신 ---------- */

function tickSkillCooldowns(deltaSec) {
    const cds = state.activeSkillRuntime.cooldowns;
    for (const id in cds) {
        if (cds[id] > 0) {
            cds[id] = Math.max(0, cds[id] - deltaSec);
        }
    }
}

export {
    getSkillCritChance,
    getSkillLuckChance,
    getSkillCooldownMult,
    getActiveCooldownRemaining,
    isHasteActive,
    isFortuneActive,
    activateSkill,
    tickSkillCooldowns
};
