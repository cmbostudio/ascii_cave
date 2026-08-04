// 게임 전역 상태(State) 및 공용 상수
// 다른 모든 모듈이 이 state 객체 하나를 공유하여 값을 읽고/씁니다.

const state = {
    gold: 0,
    ether: 0,
    currentSectorId: 0,
    purchasedTickets: [1], // Sector 1 ticket unlocked by default
    player: {
        x: 12,
        y: 10,
        baseSpeed: 5.0,
        moveCooldown: 0
    },
    upgrades: {
        bag: 0,
        dmg: 0,
        speed: 0,
        sellPrice: 0
    },
    items: {}, // item_id -> boolean
    etherPerks: {
        ether_dmg: 0,
        ether_bag: 0,
        ether_price: 0
    },
    skills: {
        passives: {
            skill_crit: 0,
            skill_luck: 0,
            skill_cooldown: 0
        },
        activeUnlocked: {
            skill_shockwave: false,
            skill_haste: false,
            skill_fortune: false
        }
    },
    // 런타임 전용 (저장하지 않음): 액티브 스킬 쿨다운 및 지속효과 타이머
    activeSkillRuntime: {
        cooldowns: {},   // skillId -> 남은 쿨다운(초)
        hasteUntil: 0,   // performance.now() 기준 만료 시각(ms)
        fortuneUntil: 0
    },
    inventory: {}, // oreName -> count in bag
    stats: {
        totalMined: {}, // oreName -> total cumulative count mined
        totalGoldEarned: 0,
        totalRebirths: 0,
        deepestSectorUnlocked: 1
    },
    mapGrid: [],
    mapWidth: 25,
    mapHeight: 19,
    targetPos: null,
    currentMiningTarget: null,
    codexSectorFilter: 0 // 0: All, 1~20: Specific Sector
};

const TILE_SIZE = 28;

export { state, TILE_SIZE };
