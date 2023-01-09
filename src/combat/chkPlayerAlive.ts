import { Player } from "../character/Player";
import { drocsay } from "../util/drocsay";
import { lib } from "../util/lib";
import { Enemy } from "../enemies/Enemy";
import { prism } from "../util/prism";
import { printEquippedItems } from "../messages/printEquippedItems";
import { printSpellsKnown } from "../messages/printSpellsKnown";

export const chkPlayerAlive = async (player: Player, enemy: Enemy) => {

    if (player.currentHealth <= 0) {
        console.log(drocsay(`${ enemy.baseType } struck a fatal blow! You have perished.`, "red"));
        await lib.misc.sleep(1000);

        console.log(drocsay(`Your deeds of valor will be remembered, ${ player.name }.`, "red"));
        await lib.misc.sleep(1000);

        console.log(`\n${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") } ${ prism("FINAL STATS", "yellow") } ${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") }`);
        console.log(prism(`  - Level: ${ player.level }` +
            `\n  - XP: ${ player.currentXp }` +
            `\n  - Gold: ${ player.currentGold }` +
            `\n  - Current Area: ${ player.area }`, "blue"));

        printEquippedItems(player);
        printSpellsKnown(player);

        process.exit(1);
    } else {
        return;
    }
}
