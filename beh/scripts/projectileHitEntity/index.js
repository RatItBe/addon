import { world, system, EquipmentSlot } from "@minecraft/server";
import { weaponList } from 'database/gun';

export function projectileHitEntity(eventData) {
    if (eventData.source.typeId !== "minecraft:player") return; //플레이어가 쏜 투사체만 허용
    const projectile = eventData.projectile;
    const entity = eventData.getEntityHit().entity;
    const player = eventData.source;

    const equippable = player.getComponent("minecraft:equippable");
    const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);

    const weapon = weaponList.find(w => w.weaponName === mainhand.typeId);
    if (!weapon) return; //총기 리스트에 없는 무기면 종료

    if (projectile.typeId === weapon.bulletName) {
        const options = {
            cause: "suicide",
            damagingEntity : player,
        }
        
        //const health = entity.getComponent("minecraft:health"); 주석 지우면
        //console.warn(health.currentValue); 피격된 엔티티 체력 확인 가능함
        entity.applyDamage(weapon.bulletDamage, options);
    }
}