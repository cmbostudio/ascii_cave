// 상점 업그레이드 / 장비 / 제단 특성(Perk) 데이터 정의
// 200시간 플레이 타임 및 1~20구역 인플레이션 곡선 적용 완료

// Shop Upgrades Definition
const SHOP_UPGRADES = [
    { id: "bag", name: "가방 용량 확장", desc: "광물을 저장하는 인벤토리의 최대 칸 수를 늘립니다.", baseCost: 50, costMult: 2.1, effect: 10, unit: "칸" },
    { id: "dmg", name: "채굴력 강화", desc: "블록 타격 시 가하는 채굴 데미지를 증가시킵니다.", baseCost: 30, costMult: 1.85, effect: 3, unit: "DMG" },
    { id: "speed", name: "이동 속도 강화 (최대 5Lv)", desc: "기본 이동 속도를 증가시킵니다. (기본 5.0 -> 최대 10.0/초)", baseCost: 100, costMult: 2.5, maxLv: 5, effect: 1.0, unit: "/초" },
    { id: "sellPrice", name: "판매 수수료 우대", desc: "광물 매각 시 받는 골드 가격을 배율로 증가시킵니다.", baseCost: 150, costMult: 2.4, effect: 0.25, unit: "x" }
];

// Expanded 13 Unique Equipment Items (1~20구역 진도 곡선에 맞춘 스케일링)
const SHOP_ITEMS = [
    { id: "item_torch", name: "고성능 횃불", desc: "광산 시야 확보용 횃불. 보유 시 채굴 데미지 +5 증가.", price: 200 },
    { id: "item_boots", name: "강화 가죽 부츠", desc: "기본 이동 속도를 +2.0/초 추가 증가시킵니다.", price: 1000 },
    { id: "item_drill", name: "플라즈마 드릴", desc: "고열 프라즈마 타격. 채굴 데미지 +30 대폭 증가.", price: 15000 },
    { id: "item_scanner", name: "희귀 광석 스캐너", desc: "광물 판매 시 매각 가격 +50% 추가 보너스.", price: 100000 },
    { id: "item_drone", name: "자동 채굴 드론", desc: "플레이어 주변 1칸 내의 광석을 초당 150 DMG 자동 타격.", price: 1500000 },
    { id: "item_magnet", name: "초전도 자력 모듈", desc: "가방 용량 +20 확장 및 자력 보너스.", price: 25000000 },
    { id: "item_dynamite", name: "양자 다이너마이트", desc: "채굴 타격 시 주변 8방향 광석에 30% 스플래시 피해 발생 & DMG +1,200.", price: 500000000 },
    { id: "item_nano_glove", name: "나노 강화 장갑", desc: "채굴 데미지 +8,000 & 15% 확률로 2배 크리티컬 채굴.", price: 10000000000 },
    { id: "item_overclock", name: "오버클럭 모터", desc: "이동 속도 +3.0/초 추가 증가 & 채굴 데미지 +45,000.", price: 250000000000 },
    { id: "item_ether_radar", name: "에테르 공명 센서", desc: "환생 시 최종 획득 에테르 금액 +25% 증폭 & DMG +200,000.", price: 7500000000000 },
    { id: "item_alchemy_bag", name: "차원 연금술 가방", desc: "가방 용량 +50 확장 & 광물 판매가 +30% 추가 상승 & DMG +800,000.", price: 200000000000000 },
    { id: "item_god_pickaxe", name: "신성한 에테르 곡괭이", desc: "채굴 데미지 +2,500,000 & 이동 속도 +1.5/초 추가 증가.", price: 5000000000000000 },
    { id: "item_hyper_drill", name: "초시공 하이퍼 드릴", desc: "차원을 뚫는 파괴력. 채굴 데미지 +10,000,000 파격 상승.", price: 100000000000000000 }
];

// Altar Ether Perks Definition (영구 영혼 강화)
const ALTAR_PERKS = [
    { id: "ether_dmg", name: "영혼의 채굴력", desc: "영구적으로 채굴 데미지 +25% 증가 (합산)", cost: 1, costMult: 2, effect: 0.25 },
    { id: "ether_bag", name: "영차원 인벤토리", desc: "영구적으로 기본 가방 용량 +10 증가", cost: 1, costMult: 2.5, effect: 10 },
    { id: "ether_price", name: "마이더스의 손길", desc: "영구적으로 전체 광물 매각가 +50% 증가", cost: 2, costMult: 3, effect: 0.5 }
];

export { SHOP_UPGRADES, SHOP_ITEMS, ALTAR_PERKS };