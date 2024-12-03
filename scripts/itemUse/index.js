import { EquipmentSlot } from "@minecraft/server";

export function itemUse(eventData) {
    const item = eventData.itemStack; // 사용된 아이템을 item 변수에 저장
    const player = eventData.source; // 아이템 사용자를 player 변수에 저장

    if (item.typeId === "fs:r306_l") {
        shootR306(player, item); // shootR306 함수 실행(26번째 줄부터)
    }
    
    else if (item.typeId === "fs:r306_reward") { //r306_reward 를 사용한다면
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

//shootR306 함수
function shootR306(player, item) {
    const ammo = item.getComponent("minecraft:durability");// 내구도 관련 정보를 ammo변수에 저장
    if (ammo.damage == ammo.maxDurability) { // 아이템이 부서지기 직전인 상황이라면
        player.sendMessage(`탄약이 부족합니다.`); // 탄약 부족 메시지 출력
    }
    else {
        const equippable = player.getComponent("minecraft:equippable"); // 장비 전체를 저장
        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand); // 손에 든 아이템 저장
        const viewDirection = player.getViewDirection(); // 플레이어 시선 각도 저장
        const baseSpeed = 8; // 탄알 속도 설정 (총마다 다르게 부여하면 됨)
        const angleSpread = 0.03; // 퍼짐 각도 설정 (이것도 총마다 다르게 부여)
        const spawnPos = { // 탄알이 생성될 위치 결정
            x: player.location.x + viewDirection.x,
            y: player.location.y + 1.5,
            z: player.location.z + viewDirection.z,
        };
        const offsetX = viewDirection.x + Math.random() * angleSpread - angleSpread / 2; //발사 각도 최종 결정 수식
        const offsetY = viewDirection.y + Math.random() * angleSpread - angleSpread / 2;
        const offsetZ = viewDirection.z + Math.random() * angleSpread - angleSpread / 2;
        const projectile = player.dimension.spawnEntity("fs:r306_bullet", spawnPos); // 탄알 생성
        const projectileComp = projectile.getComponent("minecraft:projectile");
        projectileComp.owner = player; // 탄알을 발사한 사람 지정
        projectile.applyImpulse({// 탄알에 속도 부여(발사)
            x: offsetX * baseSpeed,
            y: offsetY * baseSpeed,
            z: offsetZ * baseSpeed,
        });
        //if (player.getGameMode() != "creative") {
            //ammo.damage++; // 크리에이티브가 아닐 때는 내구도 감소 = 탄약 소비
            //mainhand.setItem(item); // 아이템 상태 갱신 = 인게임에 감소된 내구도를 반영
        //}
        player.runCommandAsync("playsound camera.take_picture @s ~~~ 5 2 1"); // 발사 소리 재생
        player.runCommandAsync("camerashake add @s 0.1 0.1 positional"); // 카메라 흔들림
    }
}