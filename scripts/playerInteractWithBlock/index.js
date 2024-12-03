import { world } from "@minecraft/server";

export function playerInteractWithBlock(eventData) {
    const block = eventData.block;
    const player = eventData.player;
    if (block.typeId === "minecraft:smithing_table") { // 블록 체크
        const job = world.scoreboard.getObjective("job").getScore(player);
        if (job !== 1) { // 스코어 체크
            eventData.cancel = true; // 조건 불일치 시 상호작용 못하게 함
            player.sendMessage("당신은 아직 이 조합대를 사용할 줄 모릅니다.");
        }
    }
}