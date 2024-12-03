import { world } from "@minecraft/server";

export function entityHurt(eventData) {
    if (eventData.hurtEntity.typeId !== "minecraft:player") return; //플레이어만 아래 코드들 실행
    const player = eventData.hurtEntity;
    const damageSource = eventData.damageSource;
    const damageCause = damageSource.cause;

    if (damageCause === "fireTick") { //불 틱 데미지를 입었다면
        const burns = world.scoreboard.getObjective("burns").getScore(player); //화상 스코어 확인
        world.scoreboard.getObjective("burns").addScore(player, 1); //화상 스코어 1 증가
        if (burns > 8 && burns <= 13) player.runCommandAsync("damage @s 1 suicide");
        else if (burns > 13 && burns <= 18) player.runCommandAsync("damage @s 2 suicide");
        else if (burns > 18 && burns <= 23) player.runCommandAsync("damage @s 3 suicide");
        else if (burns > 23) player.runCommandAsync("damage @s 4 suicide");
    }
}