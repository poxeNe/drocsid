import { Character } from "../character/Character";
import { lib } from "../util/lib";
import { Enemy } from "../enemies/Enemy";
import { mkAttackRoll } from "./mkAttackRoll";

export const calcPlayerDamage = async (player: Character, enemy: Enemy, attackType: string) => {

    if (attackType === "physical") {
        let playerPhysicalAttackCause;
        let totalWeaponDamage = 0;

        if (player.equipped.rightHand) {
            totalWeaponDamage += player.physicalAttack + lib.random.int(player.equipped.rightHand.baseMinDamage, player.equipped.rightHand.baseMaxDamage);
        }

        if (lib.random.int(1, 100) <= player.criticalChance) {
            playerPhysicalAttackCause = Math.floor((totalWeaponDamage * player.criticalModifier) - enemy.physicalDefense);
            console.log("\n-[ It was a critical hit!");
            await lib.misc.sleep(1000);
        } else {
            playerPhysicalAttackCause = totalWeaponDamage - enemy.physicalDefense;
        }

        if (playerPhysicalAttackCause < 0) {
            playerPhysicalAttackCause = 0;
        }

        return playerPhysicalAttackCause;
    }

    if (attackType === "magikal") {
        return 0;
    }


    throw new Error("-[ ERROR ] No attack type was found. (calcPlayerDamage)");

}
