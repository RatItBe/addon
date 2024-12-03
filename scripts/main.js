console.warn(`불러옴`);
import { world, system } from "@minecraft/server";

// 게임 최초 실행 시 실행될 코드(주로 스코어보드 미리 생성하기)
system.run(() => {
    if (!world.scoreboard.getObjective("burns"))
        world.scoreboard.addObjective("burns");
    if (!world.scoreboard.getObjective("job"))
        world.scoreboard.addObjective("job");
});

// 아이템 사용 시 실행될 코드
import { itemUse } from "itemUse/index";
world.afterEvents.itemUse.subscribe((eventData) => {
    const player = eventData.source
    itemUse(eventData);
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

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const playerMove = player.getComponent("minecraft:movement");
    }
});

//게임 내내 반복될 코드들 (20틱에 1번)
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