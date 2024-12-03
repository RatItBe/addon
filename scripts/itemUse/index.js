//import {  } from "@minecraft/server";

export function itemUse(eventData) {
    const item = eventData.itemStack; // 사용된 아이템을 item 변수에 저장
    const player = eventData.source; // 아이템 사용자를 player 변수에 저장
    
    if (item.typeId === "fs:r306_reward") { //r306_reward 를 사용한다면
        player.runCommandAsync("clear @s fs:r306_reward 0 1");
        player.runCommandAsync("structure load R306 ~ ~ ~"); // 임시로 이지스 방패 블러옴
        player.runCommandAsync("title @s actionbar 'R306' 수령완료!")
    }

    else if (item.typeId === "minecraft:iron_ingot") { //철괴를 사용한다면
        const random = Math.random(); // 랜덤으로 0~1 사이 숫자 설정
        player.runCommandAsync("clear @s iron_ingot 0 1"); // 철괴 1개 소모
        if (random > 0.5) player.runCommandAsync("give @s gold_ingot 1 0"); //50% 확률로
        else player.runCommandAsync("give @s diamond 1 0"); //금괴 또는 다이아 지급
    }
}
