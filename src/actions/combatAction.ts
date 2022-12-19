import { Character } from "../character/Character";
import { Enemy } from "../enemies/Enemy";
import { lib } from "../util/lib";
import readline from "readline/promises";
import { chkForLevelUp } from "../character/chkForLevelUp";
import { healingAction } from "./healingAction";
import { fleeAction } from "./fleeAction";
import { calcPlayerDamage } from "../combat/calcPlayerDamage";
import { calcEnemyDamage } from "../combat/calcEnemyDamage";
import { mkAttackRoll } from "../combat/mkAttackRoll";
import { chkSkillGains } from "../combat/chkSkillGains";

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
                console.log(`\n-[ You swing your ${ player.equipped.rightHand }...`);

                await lib.misc.sleep(1000);

            // Roll to see if we hit or not.
                await mkAttackRoll();

            // If we hit, do these things.
                if (await mkAttackRoll()) {
                    enemy.currentHealth -= await calcPlayerDamage(player, enemy, "physical");

                    if (enemy.currentHealth > 0) {
                        console.log(`\n-[ You strike the ${enemy.baseType} for ${ await calcPlayerDamage(player, enemy, "physical") }! It has ${enemy.currentHealth} health remaining.`);
                        await lib.misc.sleep(1000);

                    } else if (enemy.currentHealth <= 0) {

                    // When the enemy has no health remaining, award gold and experience.
                        player.currentXp += enemy.xpValue;
                        player.currentGold += enemy.goldValue;

                        console.log(`\n-[ Your strike to the ${ enemy.baseType } was fatal!`);
                        await lib.misc.sleep(1000);

                        if (await chkSkillGains(player, "physical")) {
                            let skillType: "One-Hand Weapons" | "Two-Hand Weapons";

                            if (player.equipped.rightHand?.gripType === 1) {
                                skillType = "One-Hand Weapons";
                            } else if (player.equipped.rightHand?.gripType === 2) {
                                skillType = "Two-Hand Weapons";
                            } else {
                                throw new Error("-[ ERROR ] Could not determine skillType! (combatAction)");
                            }

                            console.log(`\n-[ Your skill with ${ skillType } has increased by 0.1!`);
                            await lib.misc.sleep(1000);
                        }

                        console.log(`\n-[ You gain ${ enemy.xpValue } experience, and ${ enemy.goldValue } gold pieces!`);

                        break;
                    }

                // Roll to see if we gain any skills or not.
                    if (await chkSkillGains(player, "physical")) {
                        let skillType: "One-Hand Weapons" | "Two-Hand Weapons";

                        if (player.equipped.rightHand?.gripType === 1) {
                            skillType = "One-Hand Weapons";
                        } else if (player.equipped.rightHand?.gripType === 2) {
                            skillType = "Two-Hand Weapons";
                        } else {
                            throw new Error("-[ ERROR ] Could not determine skillType! (combatAction)");
                        }

                        console.log(`\n-[ Your skill with ${ skillType } has increased by 0.1!`);
                        await lib.misc.sleep(1000);
                    }

                    break;

                } else {
                    console.log("\n-[ You missed!");
                    await lib.misc.sleep(1000);
                }

            // Calculated enemy's damage to us.
                player.currentHealth -= calcEnemyDamage(player, enemy, "physical");

            // When the player has no health remaining, display a message and then exit the game.
            /* TODO: implement different penalties on death, especially after we have save games, as the player would just be able
                to reload the game and keep playing.
             */
                if (player.currentHealth <= 0) {
                    console.log(`\n-[ ${ enemy.baseType } struck a fatal blow! You have perished. \n\n-[ Your deeds of valor will be remembered.`);
                    process.exit(1);
                }

                console.log(`\n-[ The ${ enemy.baseType } hits you for ${ calcEnemyDamage(player, enemy, "physical") }! You have ${ player.currentHealth } health remaining!`);

                await lib.misc.sleep(1000);

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