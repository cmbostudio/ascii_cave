// 건물 접근 시 어떤 모달을 열지 분기 처리
import { openEntranceModal } from './modals/entrance.js';
import { openMarketModal } from './modals/market.js';
import { openShopModal } from './modals/shop.js';
import { openAltarModal } from './modals/altar.js';
import { openCodexModal } from './modals/codex.js';
import { openSkillModal } from './modals/skill.js';

function triggerBuildingInteraction(buildingType) {
    if (buildingType === 'ENTRANCE') openEntranceModal();
    else if (buildingType === 'MARKET') openMarketModal();
    else if (buildingType === 'SHOP') openShopModal();
    else if (buildingType === 'ALTAR') openAltarModal();
    else if (buildingType === 'CODEX') openCodexModal();
    else if (buildingType === 'SKILL') openSkillModal();
}

export { triggerBuildingInteraction };
