index.html                 마크업 + <link css> + <script type="module">
css/styles.css              커스텀 CSS
js/
 ├─ state.js                전역 상태(state) + 상수
 ├─ data/
 │   ├─ sectors.js          21개 구역·광물 데이터
 │   └─ shop.js             업그레이드/장비/제단 특성 데이터
 ├─ engine/
 │   ├─ renderer.js         PixiJS 초기화 & 맵 렌더링
 │   ├─ map.js               맵 생성(로비/구역)
 │   ├─ stats.js             속도·데미지·가방용량 계산
 │   ├─ mining.js            이동·채굴·드론 로직
 │   ├─ loop.js               게임 루프 & 키보드 입력
 │   └─ rebirth.js           환생 에테르 계산
 ├─ ui/
 │   ├─ log.js / header.js / inventory.js / modals.js / interactions.js
 │   └─ modals/  entrance.js, market.js, shop.js, altar.js, codex.js
 ├─ save.js                  localStorage 저장/불러오기
 ├─ events.js                버튼/탭 이벤트 바인딩
 └─ main.js                  진입점(초기화 순서 관리)