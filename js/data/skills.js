// 스킬(Skill) 데이터 정의
// - SKILL_PASSIVES: 골드로 레벨업하는 패시브 스킬 (상시 적용)
// - SKILL_ACTIVES : 골드로 1회 해금 후, 숫자키(1/2/3)로 발동하는 액티브 스킬 (쿨다운 존재)

const SKILL_PASSIVES = [
    {
        id: "skill_crit",
        name: "정밀 타격",
        desc: "채굴 타격 시 2배 데미지 크리티컬이 발생할 확률을 증가시킵니다.",
        baseCost: 300,
        costMult: 1.6,
        maxLv: 10,
        effect: 0.02, // Lv당 +2% 크리티컬 확률
        unit: "%"
    },
    {
        id: "skill_luck",
        name: "행운의 손",
        desc: "광물 채굴 성공 시 추가로 1개를 더 획득할 확률을 증가시킵니다.",
        baseCost: 400,
        costMult: 1.65,
        maxLv: 10,
        effect: 0.02, // Lv당 +2% 추가 획득 확률
        unit: "%"
    },
    {
        id: "skill_cooldown",
        name: "숙련된 시전",
        desc: "액티브 스킬들의 재사용 대기시간(쿨다운)을 감소시킵니다.",
        baseCost: 500,
        costMult: 1.7,
        maxLv: 8,
        effect: 0.03, // Lv당 -3% 쿨다운
        unit: "%"
    }
];

// cooldown: 초 단위 기본 쿨다운 (skill_cooldown 패시브로 감소 가능)
// duration: 지속형 효과일 경우 지속시간(초)
const SKILL_ACTIVES = [
    {
        id: "skill_shockwave",
        name: "충격파 강타",
        key: "1",
        name_key: "[1]",
        unlockCost: 2000,
        cooldown: 15,
        desc: "주변 3x3 범위의 모든 광물에 즉시 강력한 데미지를 입힙니다.",
        power: 80 // 고정 데미지
    },
    {
        id: "skill_haste",
        name: "질주의 바람",
        key: "2",
        name_key: "[2]",
        unlockCost: 3000,
        cooldown: 25,
        duration: 5,
        desc: "5초간 이동 속도가 2배로 증가합니다.",
        power: 2.0 // 배율
    },
    {
        id: "skill_fortune",
        name: "재물의 축복",
        key: "3",
        name_key: "[3]",
        unlockCost: 5000,
        cooldown: 40,
        duration: 10,
        desc: "10초간 광물 판매 가격이 2배로 증가합니다.",
        power: 2.0 // 배율
    }
];

export { SKILL_PASSIVES, SKILL_ACTIVES };
