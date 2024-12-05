import { system, EquipmentSlot, ItemStack } from "@minecraft/server";

// 총기 리스트 (새 총 추가할 때마다 복붙 후 수정)
const weaponList = [
    {
        weaponName: "fs:r306_l",      // 총 이름
        bulletName: "fs:r306_bullet", // 탄알 이름
        bulletSpeed: 8,               // 탄알 속도
        spreadAngle: 0.05,            // 퍼짐 각도
        shootSound: "camera.take_picture", // 발사 소리
        emptyWeaponName: "fs:r306_e", // 비어있는 총 이름
        burstCount: 3,                // 한 번에 발사할 총알 수 (점사)
        burstInterval: 2              // 점사 시 발사 간격 (초)
    },
    {
        weaponName: "fs:sentinel",
        bulletName: "fs:sentinel_bullet",
        bulletSpeed: 15,
        spreadAngle: 0.01,
        shootSound: "sentinel.shoot",
        emptyWeaponName: undefined,    // 비어있는 버전이 없는 총이면 undefined
        burstCount: 1,                // 단발이라면 1로 설정
        burstInterval: 0              // 단발이라면 0으로 설정
    }
];

export function itemReleaseUse(eventData) {
    const item = eventData.itemStack;
    const player = eventData.source;
    const weapon = weaponList.find(w => w.weaponName === item.typeId);

    if (weapon && player.getDynamicProperty("reload") < 1) {
        system.run(() => {
            shootWeapon(player, item, weapon); // 첫 번째 발사
            for (let i = 1; i < weapon.burstCount; i++) {
                system.runTimeout(() => {
                    shootWeapon(player, item, weapon);
                }, weapon.burstInterval * i);
            }
        });
    }
}

function shootWeapon(player, item, weapon) {
    const equippable = player.getComponent("minecraft:equippable");
    const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);        
    const ammo = item.getComponent("minecraft:durability");
    if (ammo.damage >= ammo.maxDurability) {
        if (weapon.emptyWeaponName) mainhand.setItem(new ItemStack(weapon.emptyWeaponName));
    }
    else {
        const viewDirection = player.getViewDirection();
        const baseSpeed = weapon.bulletSpeed;
        const spreadAngle = weapon.spreadAngle;
        const spawnPos = {
            x: player.location.x + viewDirection.x,
            y: player.location.y + 1.5,
            z: player.location.z + viewDirection.z,
        };
        const offsetX = viewDirection.x + Math.random() * spreadAngle - spreadAngle / 2;
        const offsetY = viewDirection.y + Math.random() * spreadAngle - spreadAngle / 2;
        const offsetZ = viewDirection.z + Math.random() * spreadAngle - spreadAngle / 2;
        const projectile = player.dimension.spawnEntity(weapon.bulletName, spawnPos);
        const projectileComp = projectile.getComponent("minecraft:projectile");
        projectileComp.owner = player;
        projectile.applyImpulse({
            x: offsetX * baseSpeed,
            y: offsetY * baseSpeed,
            z: offsetZ * baseSpeed,
        });
        player.runCommandAsync("playsound camera.take_picture @s ~~~ 5 2 1");
        player.runCommandAsync("camerashake add @s 0.1 0.1 positional");
        if (player.getGameMode() != "creative") {
            ammo.damage++;
            mainhand.setItem(item);
        }
    }
}
