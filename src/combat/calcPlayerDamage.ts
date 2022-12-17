import { Character } from "../character/Character";
import { lib } from "../util/lib";
import { Enemy } from "../enemies/Enemy";
import {main} from "../main";

export const calcPlayerDamage = (player: Character, enemy: Enemy, attackType: string) => {

    if (attackType === "physical") {
        let playerPhysicalAttackCause;
        let totalWeaponDamage = player.physicalAttack + lib.random.int(player.equipped.leftHand.item.baseMinDamage, player.equipped.leftHand.item.baseMaxDamage);

        if (lib.random.int(1, 100) <= player.criticalChance) {
            playerPhysicalAttackCause = (totalWeaponDamage * player.criticalModifier) - enemy.physicalDefense;
            console.log("\n-[ It was a critical hit!");
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
