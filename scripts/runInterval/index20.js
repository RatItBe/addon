import { world } from "@minecraft/server";

export function runInterval20(player) {
    const playerFire = player.getComponent("minecraft:onfire"); // 불 붙은 플레이어 확인
    const burns = world.scoreboard.getObjective("burns").getScore(player); // 화상 스코어값 확인
    if (!playerFire && burns > 0) world.scoreboard.getObjective("burns").addScore(player, -1);
}