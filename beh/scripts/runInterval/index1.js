import { world } from "@minecraft/server";

export function runInterval1(player) {
    const reload = player.getDynamicProperty("reload");
    if (reload > 0) {
        player.setDynamicProperty("reload", reload - 1);
    }
}