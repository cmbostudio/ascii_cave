// 구역(Sector) 및 광물 데이터 정의 (로비 + 1~20구역)
// 200시간 플레이 타임 및 희귀도 기반 가치 재설계 완료

const SECTOR_DATA = [
    {
        id: 0,
        name: "중앙 로비",
        env: "안전지대",
        desc: "탐사를 준비하는 중앙 로비입니다. 입구, 판매소, 상점, 재단, 도감이 위치해 있습니다.",
        ticketPrice: 0,
        ores: []
    },
    {
        id: 1,
        name: "1구역: 초입 동굴",
        env: "습한 바위 동굴",
        desc: "얕은 깊이의 입구 동굴. 기초적인 야생 광석이 노출되어 있습니다.",
        ticketPrice: 0,
        ores: [
            { char: "c", name: "구리 원석", hp: 3, val: 5, rate: 0.40, color: "#d97706" },
            { char: "i", name: "철 광석", hp: 5, val: 12, rate: 0.30, color: "#94a3b8" },
            { char: "k", name: "석탄", hp: 8, val: 25, rate: 0.20, color: "#475569" },
            { char: "s", name: "은 원석", hp: 15, val: 80, rate: 0.10, color: "#e2e8f0" }
        ]
    },
    {
        id: 2,
        name: "2구역: 흑연 암반",
        env: "단단한 퇴적층",
        desc: "압착된 암반지대. 치밀한 구조의 탄소 결합 광석이 많습니다.",
        ticketPrice: 1500,
        ores: [
            { char: "k", name: "고밀도 석탄", hp: 8, val: 20, rate: 0.40, color: "#334155" },
            { char: "z", name: "아연 조각", hp: 12, val: 45, rate: 0.30, color: "#cbd5e1" },
            { char: "i", name: "강철 원석", hp: 18, val: 100, rate: 0.20, color: "#64748b" },
            { char: "q", name: "석영 결정", hp: 30, val: 320, rate: 0.10, color: "#f1f5f9" }
        ]
    },
    {
        id: 3,
        name: "3구역: 유황 수맥",
        env: "유황 기체 자생지",
        desc: "독성이 강한 유황 가스가 뿜어져 나오는 위험한 암반 지대입니다.",
        ticketPrice: 10000,
        ores: [
            { char: "u", name: "유황 덩어리", hp: 15, val: 70, rate: 0.35, color: "#facc15" },
            { char: "b", name: "황동 원석", hp: 22, val: 160, rate: 0.25, color: "#ca8a04" },
            { char: "n", name: "니켈 덩어리", hp: 32, val: 350, rate: 0.20, color: "#a3e635" },
            { char: "f", name: "형석 파편", hp: 50, val: 800, rate: 0.15, color: "#4ade80" },
            { char: "c", name: "코발트 원석", hp: 85, val: 3500, rate: 0.05, color: "#2563eb" }
        ]
    },
    {
        id: 4,
        name: "4구역: 지하 심층 지하수",
        env: "지하 지하수계",
        desc: "침식되어 만들어진 지하 동굴. 수중 결정 광물이 자라납니다.",
        ticketPrice: 60000,
        ores: [
            { char: "w", name: "방해석 결정", hp: 30, val: 250, rate: 0.35, color: "#93c5fd" },
            { char: "a", name: "자수정 파편", hp: 45, val: 600, rate: 0.25, color: "#c084fc" },
            { char: "s", name: "사파이어 원석", hp: 65, val: 1400, rate: 0.20, color: "#3b82f6" },
            { char: "p", name: "흑진주 원핵", hp: 100, val: 3200, rate: 0.15, color: "#64748b" },
            { char: "b", name: "남옥 결정", hp: 160, val: 14000, rate: 0.05, color: "#06b6d4" }
        ]
    },
    {
        id: 5,
        name: "5구역: 심층 암반 단층",
        env: "지각 기저 단층",
        desc: "지각 깊은 곳의 강한 압력을 받아 단단해진 고밀도 광맥.",
        ticketPrice: 350000,
        ores: [
            { char: "o", name: "흑요석 조각", hp: 60, val: 900, rate: 0.32, color: "#334155" },
            { char: "r", name: "루비 원석", hp: 90, val: 2200, rate: 0.25, color: "#f43f5e" },
            { char: "t", name: "토파즈 결정", hp: 140, val: 5000, rate: 0.20, color: "#fbbf24" },
            { char: "x", name: "알렉산드라이트", hp: 220, val: 12000, rate: 0.15, color: "#22c55e" },
            { char: "O", name: "오팔 파편", hp: 350, val: 45000, rate: 0.07, color: "#e0e7ff" },
            { char: "A", name: "아다만타이트 원석", hp: 600, val: 450000, rate: 0.01, color: "#f43f5e" }
        ]
    },
    {
        id: 6,
        name: "6구역: 마그마 화산 공동",
        env: "고온 마그마 지대",
        desc: "붉은 열기로 가득 찬 화산 내부 동굴입니다.",
        ticketPrice: 2000000,
        ores: [
            { char: "v", name: "화산재 결정", hp: 120, val: 3500, rate: 0.32, color: "#ea580c" },
            { char: "l", name: "응고 용암석", hp: 180, val: 8500, rate: 0.25, color: "#dc2626" },
            { char: "s", name: "화염 석류석", hp: 280, val: 20000, rate: 0.20, color: "#b91c1c" },
            { char: "p", name: "플라즈마 정석", hp: 450, val: 50000, rate: 0.15, color: "#f97316" },
            { char: "M", name: "마그마 코어", hp: 750, val: 180000, rate: 0.072, color: "#ef4444" },
            { char: "H", name: "헬파이어 스톤", hp: 1300, val: 2500000, rate: 0.008, color: "#facc15" }
        ]
    },
    {
        id: 7,
        name: "7구역: 빙하 빙혈",
        env: "극지 만년설 동굴",
        desc: "수만 년간 동결된 만년설 속 청정한 얼음 결정체.",
        ticketPrice: 12000000,
        ores: [
            { char: "i", name: "만년설 얼음", hp: 250, val: 14000, rate: 0.30, color: "#bae6fd" },
            { char: "c", name: "서리 결정", hp: 380, val: 32000, rate: 0.24, color: "#7dd3fc" },
            { char: "f", name: "동결 루비", hp: 580, val: 75000, rate: 0.18, color: "#38bdf8" },
            { char: "g", name: "글레이셔 코어", hp: 900, val: 180000, rate: 0.14, color: "#0284c7" },
            { char: "A", name: "절대영도 결정", hp: 1400, val: 450000, rate: 0.09, color: "#e0f2fe" },
            { char: "B", name: "블리자드 하트", hp: 2200, val: 1600000, rate: 0.045, color: "#06b6d4" },
            { char: "Z", name: "절대영도 엠페러", hp: 4000, val: 25000000, rate: 0.005, color: "#ffffff" }
        ]
    },
    {
        id: 8,
        name: "8구역: 초심해 해구",
        env: "심해 초고압 지대",
        desc: "빛조차 들지 않는 심해 바닥의 압축된 고밀도 자원.",
        ticketPrice: 75000000,
        ores: [
            { char: "d", name: "심해 셰일", hp: 500, val: 55000, rate: 0.30, color: "#1e3a8a" },
            { char: "m", name: "망간 단괴", hp: 750, val: 130000, rate: 0.24, color: "#3b82f6" },
            { char: "h", name: "심해 열수석", hp: 1200, val: 300000, rate: 0.18, color: "#60a5fa" },
            { char: "a", name: "심해 심연석", hp: 1800, val: 700000, rate: 0.14, color: "#1d4ed8" },
            { char: "K", name: "크라켄 영석", hp: 2800, val: 1800000, rate: 0.09, color: "#9333ea" },
            { char: "L", name: "레비아탄 정수", hp: 4500, val: 6500000, rate: 0.045, color: "#a855f7" },
            { char: "N", name: "포세이돈의 삼지창", hp: 8000, val: 100000000, rate: 0.005, color: "#38bdf8" }
        ]
    },
    {
        id: 9,
        name: "9구역: 발광 버섯 숲",
        env: "지하 생체 발광지대",
        desc: "생체 에너지가 광물과 결합한 신비로운 화석 자원.",
        ticketPrice: 450000000,
        ores: [
            { char: "m", name: "발광 포자석", hp: 1000, val: 220000, rate: 0.28, color: "#4ade80" },
            { char: "b", name: "바이오 앰버", hp: 1500, val: 500000, rate: 0.22, color: "#84cc16" },
            { char: "e", name: "엘프 수액 결정", hp: 2400, val: 1200000, rate: 0.17, color: "#22c55e" },
            { char: "n", name: "네이처 하트", hp: 3600, val: 2800000, rate: 0.13, color: "#16a34a" },
            { char: "S", name: "세계수 파편", hp: 5500, val: 7000000, rate: 0.09, color: "#15803d" },
            { char: "G", name: "가이아 코어", hp: 8500, val: 18000000, rate: 0.07, color: "#86efac" },
            { char: "Y", name: "세계수의 영혼", hp: 14000, val: 65000000, rate: 0.036, color: "#facc15" },
            { char: "X", name: "에덴의 원형 결정", hp: 25000, val: 1000000000, rate: 0.004, color: "#ffffff" }
        ]
    },
    {
        id: 10,
        name: "10구역: 미지의 고대 유적",
        env: "초고대 초문명 구조체",
        desc: "지상 이전 유적의 벽면을 구성하는 합금 자원.",
        ticketPrice: 3000000000,
        ores: [
            { char: "r", name: "고대 룬석", hp: 2000, val: 1000000, rate: 0.28, color: "#94a3b8" },
            { char: "a", name: "유적 오리할콘", hp: 3000, val: 2400000, rate: 0.22, color: "#f59e0b" },
            { char: "m", name: "미스릴 원석", hp: 4800, val: 5800000, rate: 0.17, color: "#38bdf8" },
            { char: "g", name: "골렘의 정수", hp: 7200, val: 14000000, rate: 0.13, color: "#d97706" },
            { char: "E", name: "엘더 스톤", hp: 11000, val: 35000000, rate: 0.09, color: "#a855f7" },
            { char: "C", name: "아틀란티스 코어", hp: 17000, val: 90000000, rate: 0.07, color: "#06b6d4" },
            { char: "T", name: "고대 파라오 황금상", hp: 28000, val: 320000000, rate: 0.037, color: "#fbbf24" },
            { char: "Z", name: "라의 태양 석판", hp: 50000, val: 5000000000, rate: 0.003, color: "#f43f5e" }
        ]
    },
    {
        id: 11,
        name: "11구역: 월면 고지대",
        env: "달 레골리스 지대",
        desc: "지구 외곽 궤도, 달의 사막에 노출된 운석 자원.",
        ticketPrice: 20000000000,
        ores: [
            { char: "l", name: "월면 표토", hp: 4000, val: 5000000, rate: 0.26, color: "#cbd5e1" },
            { char: "h", name: "헬륨-3 응축체", hp: 6000, val: 12000000, rate: 0.20, color: "#60a5fa" },
            { char: "m", name: "월석 결정", hp: 9500, val: 28000000, rate: 0.16, color: "#f1f5f9" },
            { char: "t", name: "티탄 석영", hp: 15000, val: 65000000, rate: 0.12, color: "#94a3b8" },
            { char: "M", name: "루나 마그넷", hp: 24000, val: 160000000, rate: 0.09, color: "#e2e8f0" },
            { char: "S", name: "셀레네의 눈", hp: 38000, val: 400000000, rate: 0.08, color: "#38bdf8" },
            { char: "L", name: "루나 이클립스 스톤", hp: 60000, val: 1200000000, rate: 0.05, color: "#c084fc" },
            { char: "K", name: "달의 여신 파편", hp: 95000, val: 3500000000, rate: 0.037, color: "#f472b6" },
            { char: "W", name: "아르테미스의 빛", hp: 160000, val: 50000000000, rate: 0.003, color: "#ffffff" }
        ]
    },
    {
        id: 12,
        name: "12구역: 화성 붉은 계곡",
        env: "화성 산화철 대지",
        desc: "화성의 거친 붉은 대지 아래 매장된 중금속 광맥.",
        ticketPrice: 150000000000,
        ores: [
            { char: "m", name: "화성 산화철", hp: 8000, val: 25000000, rate: 0.26, color: "#ef4444" },
            { char: "c", name: "메탄 수화물", hp: 12000, val: 60000000, rate: 0.20, color: "#f97316" },
            { char: "o", name: "올림푸스암", hp: 19000, val: 140000000, rate: 0.16, color: "#b91c1c" },
            { char: "p", name: "퍼서비어런스 코어", hp: 30000, val: 350000000, rate: 0.12, color: "#f59e0b" },
            { char: "V", name: "볼케이노 게인", hp: 48000, val: 850000000, rate: 0.09, color: "#dc2626" },
            { char: "A", name: "아레스 크리스탈", hp: 75000, val: 2200000000, rate: 0.08, color: "#f43f5e" },
            { char: "R", name: "레드 플래닛 하트", hp: 120000, val: 6500000000, rate: 0.05, color: "#ea580c" },
            { char: "F", name: "포보스 인베이더", hp: 190000, val: 18000000000, rate: 0.038, color: "#78350f" },
            { char: "X", name: "아레스의 심장 창", hp: 320000, val: 350000000000, rate: 0.002, color: "#fb7185" }
        ]
    },
    {
        id: 13,
        name: "13구역: 목성 소행성대",
        env: "우주 암석 밀집 구역",
        desc: "우주 공간을 부유하는 고밀도 소행성 조각들.",
        ticketPrice: 1200000000000,
        ores: [
            { char: "a", name: "소행성 파편", hp: 16000, val: 140000000, rate: 0.24, color: "#64748b" },
            { char: "i", name: "운석 강철", hp: 24000, val: 320000000, rate: 0.18, color: "#94a3b8" },
            { char: "p", name: "팔라사이트", hp: 38000, val: 750000000, rate: 0.15, color: "#fbbf24" },
            { char: "r", name: "이리듐 암석", hp: 60000, val: 1800000000, rate: 0.12, color: "#e2e8f0" },
            { char: "C", name: "세레스 코어", hp: 95000, val: 4500000000, rate: 0.09, color: "#a855f7" },
            { char: "J", name: "주피터스 아이", hp: 150000, val: 12000000000, rate: 0.08, color: "#f59e0b" },
            { char: "B", name: "오르트 구체", hp: 240000, val: 32000000000, rate: 0.07, color: "#0284c7" },
            { char: "Y", name: "소행성 왕관", hp: 380000, val: 95000000000, rate: 0.045, color: "#facc15" },
            { char: "H", name: "제우스의 벼락", hp: 600000, val: 320000000000, rate: 0.023, color: "#38bdf8" },
            { char: "S", name: "스타버스트 오브", hp: 1000000, val: 4000000000000, rate: 0.002, color: "#ffffff" }
        ]
    },
    {
        id: 14,
        name: "14구역: 토성 고리 외각",
        env: "얼음 및 프라즈마 고리",
        desc: "토성의 화려한 고리를 이루는 결정화된 우주 얼음 광물.",
        ticketPrice: 10000000000000,
        ores: [
            { char: "r", name: "고리 얼음 조각", hp: 32000, val: 750000000, rate: 0.24, color: "#38bdf8" },
            { char: "t", name: "타이탄 메탄석", hp: 48000, val: 1800000000, rate: 0.18, color: "#0284c7" },
            { char: "s", name: "성간 먼지 뭉치", hp: 75000, val: 4200000000, rate: 0.15, color: "#c084fc" },
            { char: "e", name: "엔셀라두스 수중석", hp: 120000, val: 10000000000, rate: 0.12, color: "#a5f3fc" },
            { char: "S", name: "새턴 오라", hp: 190000, val: 26000000000, rate: 0.09, color: "#facc15" },
            { char: "C", name: "크로노스 크리스탈", hp: 300000, val: 65000000000, rate: 0.08, color: "#e0f2fe" },
            { char: "H", name: "프로메테우스 화염", hp: 480000, val: 170000000000, rate: 0.07, color: "#f97316" },
            { char: "R", name: "크로노스 왕좌", hp: 750000, val: 500000000000, rate: 0.045, color: "#eab308" },
            { char: "T", name: "시간의 모래시계", hp: 1200000, val: 1600000000000, rate: 0.023, color: "#a855f7" },
            { char: "E", name: "이터널 새턴 코어", hp: 2000000, val: 25000000000000, rate: 0.002, color: "#38bdf8" }
        ]
    },
    {
        id: 15,
        name: "15구역: 성운 심층부",
        env: "초신성 잔해 성운",
        desc: "별의 폭발로 태어난 화려하고 강렬한 성간 물질.",
        ticketPrice: 80000000000000,
        ores: [
            { char: "n", name: "성운 가스 결정", hp: 64000, val: 4200000000, rate: 0.22, color: "#ec4899" },
            { char: "s", name: "초신성 파편", hp: 96000, val: 10000000000, rate: 0.17, color: "#f43f5e" },
            { char: "d", name: "성간 다이아몬드", hp: 150000, val: 25000000000, rate: 0.14, color: "#f8fafc" },
            { char: "p", name: "펄사 밀도석", hp: 240000, val: 65000000000, rate: 0.11, color: "#a855f7" },
            { char: "N", name: "네뷸라 하트", hp: 380000, val: 170000000000, rate: 0.09, color: "#f472b6" },
            { char: "S", name: "스텔라 엠페러", hp: 600000, val: 420000000000, rate: 0.08, color: "#fbbf24" },
            { char: "G", name: "은하수 정수", hp: 950000, val: 1100000000000, rate: 0.07, color: "#818cf8" },
            { char: "W", name: "워프 코어", hp: 1500000, val: 3200000000000, rate: 0.05, color: "#38bdf8" },
            { char: "Y", name: "은하 중심 블랙홀 파편", hp: 2400000, val: 9500000000000, rate: 0.038, color: "#475569" },
            { char: "M", name: "초신성 폭발 순간", hp: 3800000, val: 28000000000000, rate: 0.021, color: "#f43f5e" },
            { char: "P", name: "펄사 비콘 스톤", hp: 6500000, val: 250000000000000, rate: 0.001, color: "#facc15" }
        ]
    },
    {
        id: 16,
        name: "16구역: 데이터 그리드",
        env: "가상 물리 시뮬레이션",
        desc: "우주의 경계에 위치한 모놀리식 디지털 데이터 공간.",
        ticketPrice: 700000000000000,
        ores: [
            { char: "0", name: "0-비트 블록", hp: 120000, val: 26000000000, rate: 0.22, color: "#22c55e" },
            { char: "1", name: "1-비트 코어", hp: 180000, val: 65000000000, rate: 0.17, color: "#10b981" },
            { char: "b", name: "바이트 픽셀", hp: 280000, val: 160000000000, rate: 0.14, color: "#34d399" },
            { char: "p", name: "패킷 노드", hp: 450000, val: 420000000000, rate: 0.11, color: "#059669" },
            { char: "G", name: "기가코드 메인", hp: 700000, val: 1100000000000, rate: 0.09, color: "#6ee7b7" },
            { char: "M", name: "매트릭스 오메가", hp: 1100000, val: 2800000000000, rate: 0.08, color: "#a7f3d0" },
            { char: "K", name: "킬로바이트 서버", hp: 1800000, val: 7500000000000, rate: 0.07, color: "#34d399" },
            { char: "F", name: "파이어월 실드", hp: 2800000, val: 22000000000000, rate: 0.05, color: "#f87171" },
            { char: "R", name: "람다 연산자", hp: 4500000, val: 65000000000000, rate: 0.038, color: "#fbbf24" },
            { char: "E", name: "로직 폭탄 결정", hp: 7000000, val: 180000000000000, rate: 0.021, color: "#ef4444" },
            { char: "X", name: "루트 제로 픽셀", hp: 12000000, val: 2000000000000000, rate: 0.001, color: "#ffffff" }
        ]
    },
    {
        id: 17,
        name: "17구역: 퀀텀 암호 회랑",
        env: "양자 중첩 필드",
        desc: "관측하기 전에는 상태가 결정되지 않는 관측불가 암호 영역.",
        ticketPrice: 6000000000000000,
        ores: [
            { char: "q", name: "큐비트 조각", hp: 250000, val: 180000000000, rate: 0.20, color: "#06b6d4" },
            { char: "e", name: "얽힘 결정체", hp: 380000, val: 450000000000, rate: 0.16, color: "#0891b2" },
            { char: "c", name: "암호화 암석", hp: 600000, val: 1200000000000, rate: 0.13, color: "#67e8f9" },
            { char: "f", name: "파동함수 집합", hp: 950000, val: 3200000000000, rate: 0.11, color: "#22d3ee" },
            { char: "Q", name: "퀀텀 싱귤래리티", hp: 1500000, val: 8500000000000, rate: 0.09, color: "#a5f3fc" },
            { char: "E", name: "아인슈타인 넥서스", hp: 2400000, val: 22000000000000, rate: 0.08, color: "#e0f2fe" },
            { char: "H", name: "슈뢰딩거의 고양이 상자", hp: 3800000, val: 60000000000000, rate: 0.07, color: "#c084fc" },
            { char: "P", name: "플랑크 길이 파편", hp: 6000000, val: 170000000000000, rate: 0.06, color: "#f472b6" },
            { char: "U", name: "불확정성 정수", hp: 9500000, val: 450000000000000, rate: 0.04, color: "#facc15" },
            { char: "N", name: "양자 결맞음 응축체", hp: 15000000, val: 1200000000000000, rate: 0.03, color: "#38bdf8" },
            { char: "T", name: "다중우주 관측기", hp: 24000000, val: 3500000000000000, rate: 0.019, color: "#a855f7" },
            { char: "Z", name: "갓 파티클 (신의 입자)", hp: 40000000, val: 8000000000000000, rate: 0.001, color: "#ffffff" }
        ]
    },
    {
        id: 18,
        name: "18구역: 픽셀 보이드",
        env: "허무의 가장자리",
        desc: "모든 물리 법칙이 소멸하는 검은 공간의 파편들.",
        ticketPrice: 50000000000000000,
        ores: [
            { char: ".", name: "보이드 입자", hp: 500000, val: 1500000000000, rate: 0.20, color: "#64748b" },
            { char: "x", name: "소멸의 잔재", hp: 750000, val: 3800000000000, rate: 0.16, color: "#475569" },
            { char: "v", name: "공허 결정", hp: 1200000, val: 9500000000000, rate: 0.13, color: "#334155" },
            { char: "d", name: "다크매터 매스", hp: 1900000, val: 24000000000000, rate: 0.11, color: "#1e293b" },
            { char: "V", name: "보이드 로드", hp: 3000000, val: 65000000000000, rate: 0.09, color: "#0f172a" },
            { char: "A", name: "어비스 에센스", hp: 4800000, val: 170000000000000, rate: 0.08, color: "#f8fafc" },
            { char: "N", name: "널 포인터 결빙체", hp: 7500000, val: 450000000000000, rate: 0.07, color: "#94a3b8" },
            { char: "S", name: "영점 에너지 코어", hp: 12000000, val: 1200000000000000, rate: 0.06, color: "#38bdf8" },
            { char: "K", name: "카오스 에테르", hp: 19000000, val: 3000000000000000, rate: 0.04, color: "#c084fc" },
            { char: "G", name: "종말의 종소리", hp: 30000000, val: 5000000000000000, rate: 0.03, color: "#fbbf24" },
            { char: "D", name: "네더 보이드 하트", hp: 48000000, val: 7000000000000000, rate: 0.019, color: "#f43f5e" },
            { char: "O", name: "허무의 왕관", hp: 80000000, val: 8500000000000000, rate: 0.001, color: "#ffffff" }
        ]
    },
    {
        id: 19,
        name: "19구역: 이벤트 호라이즌",
        env: "블랙홀 시공간 왜곡 지대",
        desc: "시간과 공간이 붕괴되어 무한히 압축된 특이점 부근.",
        ticketPrice: 350000000000000000,
        ores: [
            { char: "s", name: "시공간 파편", hp: 1000000, val: 11000000000000, rate: 0.18, color: "#c084fc" },
            { char: "g", name: "중력 붕괴석", hp: 1500000, val: 28000000000000, rate: 0.15, color: "#a855f7" },
            { char: "w", name: "웜홀 아티팩트", hp: 2400000, val: 70000000000000, rate: 0.12, color: "#9333ea" },
            { char: "h", name: "호킹 복사체", hp: 3800000, val: 180000000000000, rate: 0.10, color: "#7e22ce" },
            { char: "B", name: "블랙홀 코어", hp: 6000000, val: 480000000000000, rate: 0.09, color: "#581c87" },
            { char: "T", name: "타임 패러독스", hp: 9500000, val: 1200000000000000, rate: 0.08, color: "#e9d5ff" },
            { char: "C", name: "슈바르츠실트 반지름", hp: 15000000, val: 3000000000000000, rate: 0.07, color: "#6b21a8" },
            { char: "P", name: "타임 루프 결정", hp: 24000000, val: 5500000000000000, rate: 0.06, color: "#d8b4fe" },
            { char: "M", name: "화이트홀 관문", hp: 38000000, val: 7500000000000000, rate: 0.05, color: "#f8fafc" },
            { char: "E", name: "아인슈타인-로젠 다리", hp: 60000000, val: 8200000000000000, rate: 0.04, color: "#38bdf8" },
            { char: "R", name: "시공간 왜곡장", hp: 95000000, val: 8600000000000000, rate: 0.03, color: "#facc15" },
            { char: "A", name: "특이점의 눈", hp: 150000000, val: 8800000000000000, rate: 0.0195, color: "#f43f5e" },
            { char: "X", name: "빅뱅의 시초석", hp: 250000000, val: 9000000000000000, rate: 0.0005, color: "#ffffff" }
        ]
    },
    {
        id: 20,
        name: "20구역: 시뮬레이션 코어",
        env: "최후의 데이터 원점",
        desc: "모든 우주의 규칙을 관장하는 시뮬레이션의 최심부.",
        ticketPrice: 2000000000000000000,
        ores: [
            { char: "C", name: "코어 소스코드", hp: 220000, val: 40000000000, rate: 0.16, color: "#38bdf8" },
            { char: "R", name: "루트 권한석", hp: 320000, val: 100000000000, rate: 0.14, color: "#f43f5e" },
            { char: "G", name: "글로벌 프레임", hp: 460000, val: 250000000000, rate: 0.12, color: "#facc15" },
            { char: "A", name: "아키텍트 노드", hp: 680000, val: 650000000000, rate: 0.10, color: "#4ade80" },
            { char: "D", name: "디바인 오버라이드", hp: 1000000, val: 1800000000000, rate: 0.08, color: "#fb7185" },
            { char: "O", name: "오메가 파이널 코드", hp: 1500000, val: 4500000000000, rate: 0.07, color: "#e2e8f0" },
            { char: "S", name: "시스템 커널", hp: 2100000, val: 12000000000000, rate: 0.06, color: "#0284c7" },
            { char: "M", name: "마스터 메모리", hp: 2900000, val: 32000000000000, rate: 0.05, color: "#a855f7" },
            { char: "I", name: "무한 루프 코어", hp: 3900000, val: 90000000000000, rate: 0.04, color: "#ec4899" },
            { char: "B", name: "갓 핸드 오버라이드", hp: 5100000, val: 250000000000000, rate: 0.03, color: "#eab308" },
            { char: "V", name: "메인프레임 프레시던트", hp: 6500000, val: 700000000000000, rate: 0.025, color: "#06b6d4" },
            { char: "U", name: "시뮬레이터 창조주", hp: 8200000, val: 1800000000000000, rate: 0.015, color: "#a7f3d0" },
            { char: "Y", name: "오메가 엔딩 메세지", hp: 10000000, val: 4000000000000000, rate: 0.0095, color: "#fb7185" },
            { char: "Z", name: "게임 개발자의 직인", hp: 15000000, val: 8000000000000000, rate: 0.0005, color: "#ffffff" }
        ]
    }
];

export { SECTOR_DATA };