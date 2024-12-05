console.warn(`불러옴`);
import { world, system } from "@minecraft/server";

// 게임 최초 실행 시 실행될 코드(현재 미사용)
//system.run(() => {
//});

// 아이템 사용 시 실행될 코드
import { itemUse } from "itemUse/index";
world.afterEvents.itemUse.subscribe((eventData) => {
    itemUse(eventData);
});

// 충전형 아이템 충전 후 사용 시 실행될 코드
import { itemReleaseUse } from "itemReleaseUse/index";
world.afterEvents.itemReleaseUse.subscribe((eventData) => {
    itemReleaseUse(eventData);
});

// 충전형 아이템 충전 완료 시 실행될 코드
import { itemCompleteUse } from "itemCompleteUse/index";
world.afterEvents.itemCompleteUse.subscribe((eventData) => {
    itemCompleteUse(eventData);
});

//플레이어 스폰 시 실행될 코드
import { playerSpawn } from "playerSpawn/index";
world.afterEvents.playerSpawn.subscribe((eventData) => {
    playerSpawn(eventData);
});

//블록과 상호작용 시 실행될 코드
import { playerInteractWithBlock } from "playerInteractWithBlock/index";
world.beforeEvents.playerInteractWithBlock.subscribe((eventData) => { 
    playerInteractWithBlock(eventData);
});

//게임 내내 반복될 코드 (1틱에 1번)
import { runInterval1 } from "runInterval/index1"
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        runInterval1(player);
    }
}, 1)

//게임 내내 반복될 코드 (20틱에 1번)
import { runInterval20 } from "runInterval/index20"
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        runInterval20(player);
    }
}, 20)

//엔티티가 데미지를 입는 순간 실행될 코드들
import { entityHurt } from "entityHurt/index";
world.afterEvents.entityHurt.subscribe((eventData) => {
    entityHurt(eventData);
});
