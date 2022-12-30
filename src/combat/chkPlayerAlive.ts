import { Character } from "../character/Character";
import { drocsay } from "../util/drocsay";
import { lib } from "../util/lib";
import { Enemy } from "../enemies/Enemy";
import { prism } from "../util/prism";

export const chkPlayerAlive = async (player: Character, enemy: Enemy) => {

    if (player.currentHealth <= 0) {
        console.log(drocsay(`${ enemy.baseType } struck a fatal blow! You have perished.`, "red"));
        await lib.misc.sleep(1000);

        console.log(drocsay(`Your deeds of valor will be remembered, ${ player.name }.`, "red"));
        await lib.misc.sleep(1000);

        console.log(drocsay("----------] Final Stats [---------- ]-", "cyan"));
        console.log(prism(`Level: ${ player.level }  \nCurrent XP: ${ player.currentXp }  \nCurrent Gold: ${ player.currentGold }  \nEquipped Items: ${ player.equipped }  \nSpells Known: ${ player.spellbook }  \nArea Died: ${ player.area }`, "blue"));

        /*
        TODO: maybe list out a character sheet upon death with stats, equipment, total xp, etc.
         */
        process.exit(1);
    } else {

        return;
    }
}
