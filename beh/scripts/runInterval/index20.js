// import {  } from "@minecraft/server";

export function runInterval20(player) {
    const playerFire = player.getComponent("minecraft:onfire"); // 불 붙은 플레이어 확인
    const burns = player.getDynamicProperty("burns"); // 화상 값 확인
    if (!playerFire && burns > 0) player.setDynamicProperty("burns", burns - 1); 
} //불이 안붙었는데 화상 값이 존재한다면 1초에 1씩 내려감