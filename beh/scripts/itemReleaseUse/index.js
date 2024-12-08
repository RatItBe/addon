import { world, system, EquipmentSlot, ItemStack } from "@minecraft/server";
import { weaponList } from 'database/gun';


export function itemReleaseUse(eventData) {
    const item = eventData.itemStack;
    const player = eventData.source;
    const weapon = weaponList.find(w => w.weaponName === item.typeId);

    if (weapon && player.getDynamicProperty("reload") < 1) {
        system.run(() => {
            shootWeapon(player, item, weapon);
            for (let i = 1; i < weapon.burst.count; i++) {
                system.runTimeout(() => {
                    shootWeapon(player, item, weapon);
                }, weapon.burst.tick * i);
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
        const soundLocation = {
            x: player.location.x + viewDirection.x,
            y: player.location.y + viewDirection.y + 1.5,
            z: player.location.z + viewDirection.z,
        }
        world.playSound(weapon.weaponSound.name, soundLocation,
            { pitch: weapon.weaponSound.pitch, volume: weapon.weaponSound.volume })
        player.runCommandAsync("camerashake add @s 0.1 0.1 positional");
        if (player.getGameMode() != "creative") {
            ammo.damage++;
            mainhand.setItem(item);
        }
    }
}
