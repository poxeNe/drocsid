import { Character } from "../character/Character";
import { Enemy } from "../enemies/Enemy";
import { lib } from "../util/lib";
import readline from "readline/promises";
import { chkForLevelUp } from "../character/chkForLevelUp";
import { healingAction } from "./healingAction";
import { fleeAction } from "./fleeAction";
import { calcPlayerDamage } from "../combat/calcPlayerDamage";
import { calcEnemyDamage } from "../combat/calcEnemyDamage";

// await lib.misc.sleep(1500);

export const combatAction = async (player: Character, enemy: Enemy) => {


    // Initialization of readline interface.
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    console.log("\n-[ Picking a fight...");
    await lib.misc.sleep(1500);

    console.log(`\n-[ A wild level ${enemy.level} ${ enemy.baseType } appears!`);
    await lib.misc.sleep(1000);

    // TODO: Make striking first random

    while (enemy.currentHealth > 0) {
        // const playerPhysicalAttackCause = calcPlayerDamage();
        // const enemyPhysicalDamageCause = calcEnemyDamage();

        // Prompt the player with the menu and await their response to the question.
        const playerChoice = await rl.question(`\n-[ What would you like to do?:
            \n  -[ 1 ] Physical Attack. \n  -[ 2 ] Magikal Attack. \n  -[ 3 ] Heal. \n  -[ 4 ] Flee.
        `);

        switch (playerChoice) {

            case "1":
                console.log(`\n-[ You swing your ${ player.equipped.leftHand }...`); // TODO: Tell the player what they're swinging with.

                await lib.misc.sleep(1000);

                enemy.currentHealth -= calcPlayerDamage(player, enemy, "physical");

                if (enemy.currentHealth > 0) {
                    console.log(`\n-[ You strike the ${enemy.baseType} for ${ calcPlayerDamage(player, enemy, "physical") }! It has ${enemy.currentHealth} health remaining.`);

                } else if (enemy.currentHealth <= 0) {
                    player.currentXp += enemy.xpValue
                    player.currentGold += enemy.goldValue
                    console.log(`\n-[ Your strike to the ${ enemy.baseType } was fatal!`);
                    console.log(`\n-[ You gain ${ enemy.xpValue } experience, and ${ enemy.goldValue } gold pieces!`);

                    break;
                }

                await lib.misc.sleep(1000);

                player.currentHealth -= calcEnemyDamage(player, enemy, "physical");
                if (player.currentHealth <= 0) {
                    console.log(`\n-[ ${ enemy.baseType } struck a fatal blow! You have perished. \n\n-[ Your deeds of valor will be remembered.`);
                    process.exit(1);
                }

                console.log(`\n-[ The ${ enemy.baseType } hits you for ${ calcEnemyDamage(player, enemy, "physical") }! You have ${ player.currentHealth } remaining!`);

                await lib.misc.sleep(750);

                break;

            case "2":
                console.log("\n-[ Making a magikal attack!"); // TODO: Tell the player what spell they're using.

                break;

            case "3": // TODO: Implement healing action.
                await healingAction(player);
                await lib.misc.sleep(1500);

                break;

            case "4": // TODO: Variation to flee chance?
                const playerFlee = await fleeAction();

                if (playerFlee) {
                    return;
                } else {
                    break;
                }

            default:
                console.log("\n-[ ERROR ] Invalid option, please try again.");

                break;
        }

    }

    rl.close();
    chkForLevelUp(player);

}