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
import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";

// await lib.misc.sleep(1500);

export const combatAction = async (player: Character, enemy: Enemy) => {

    // Initialization of readline interface.
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    console.log(drocsay("Picking a fight...", "yellow"));
    await lib.misc.sleep(1500);

    console.log(drocsay(`A wild level ${enemy.level} ${ enemy.baseType } appears!`, "magenta"));
    await lib.misc.sleep(1000);

    // TODO: Make striking first random

    while (enemy.currentHealth > 0) {
        // const playerPhysicalAttackCause = calcPlayerDamage();
        // const enemyPhysicalDamageCause = calcEnemyDamage();

        console.log(drocsay("What would you like to do?: "));

        // Prompt the player with the menu and await their response to the question.
        const playerChoice = await rl.question(prism(`\n  -[ 1 ] Physical Attack. \n  -[ 2 ] Magikal Attack. \n  -[ 3 ] Heal. \n  -[ 4 ] Flee.
        `, "cyan"));

        switch (playerChoice) {

            case "1":
                console.log(drocsay(`You swing your ${ player.equipped.rightHand?.name }...`, "yellow"));

                await lib.misc.sleep(1000);

            // Roll to see if we hit or not.
                await mkAttackRoll();

            // If we hit, do these things.
                if (await mkAttackRoll()) {
                    enemy.currentHealth -= await calcPlayerDamage(player, enemy, "physical");

                    if (enemy.currentHealth > 0) {
                        console.log(drocsay(`You strike the ${enemy.baseType} for ${ await calcPlayerDamage(player, enemy, "physical") }! It has ${enemy.currentHealth} health remaining.`, "yellow"));
                        await lib.misc.sleep(1000);

                    } else if (enemy.currentHealth <= 0) {

                    // When the enemy has no health remaining, award gold and experience.
                        player.currentXp += enemy.xpValue;
                        player.currentGold += enemy.goldValue;

                        console.log(drocsay(`Your strike to the ${ enemy.baseType } was fatal!`, "yellow"));
                        await lib.misc.sleep(1000);

                        if (await chkSkillGains(player, "physical")) {
                            let skillType: "One-Hand Weapons" | "Two-Hand Weapons";

                            if (player.equipped.rightHand?.gripType === 1) {
                                skillType = "One-Hand Weapons";
                            } else if (player.equipped.rightHand?.gripType === 2) {
                                skillType = "Two-Hand Weapons";
                            } else {
                                throw new Error(drocsay("ERROR ] Could not determine skillType! (combatAction)", "red"));
                            }

                            console.log(drocsay(`Your skill with ${ skillType } has increased by 0.1!`, "green"));
                            await lib.misc.sleep(1000);
                        }

                        console.log(drocsay(`You gain ${ enemy.xpValue } experience, and ${ enemy.goldValue } gold pieces!`, "yellow"));

                    // For each item in the enemy's inventory, add it to ours.
                        enemy.inventory.forEach(e => player.inventory.push(e));

                        console.log(drocsay(`The enemy dropped ${ lib.array.commas(enemy.inventory) }. You put the things in your pack.`))

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
                            throw new Error(drocsay("ERROR ] Could not determine skillType! (combatAction)", "red"));
                        }

                        console.log(drocsay(`Your skill with ${ skillType } has increased by 0.1!`, "green"));
                        await lib.misc.sleep(1000);
                    }

                } else {
                    console.log(drocsay("You missed!", "yellow"));
                    await lib.misc.sleep(1000);
                }

            // Calculated enemy's damage to us.
                player.currentHealth -= calcEnemyDamage(player, enemy, "physical");

            // When the player has no health remaining, display a message and then exit the game.
            /* TODO: implement different penalties on death, especially after we have save games, as the player would just be able
                to reload the game and keep playing.
             */
                if (player.currentHealth <= 0) {
                    console.log(drocsay(`${ enemy.baseType } struck a fatal blow! You have perished.`, "red"));
                    await lib.misc.sleep(1000);

                    console.log(drocsay(`Your deeds of valor will be remembered, ${ player.name }.`, "red"));
                    await lib.misc.sleep(1000);

                    console.log(drocsay(`----------] Final Stats [---------- ]-  \nLevel: ${ player.level }  \nCurrent XP: ${ player.currentXp }  \nCurrent Gold: ${ player.currentGold }  \nEquipped Items: ${ player.equipped }  \nSpells Known: ${ player.spellbook }  \nArea Died: ${ player.area }`, "blue"));

                    /*
                    TODO: maybe list out a character sheet upon death with stats, equipment, total xp, etc.
                     */
                    process.exit(1);
                }

                console.log(drocsay(`The ${ enemy.baseType } hits you for ${ calcEnemyDamage(player, enemy, "physical") }! You have ${ player.currentHealth } health remaining!`, "red"));

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
                console.log(drocsay("ERROR ] Invalid option, please try again.", "red"));

                break;
        }

    }

    rl.close();
    chkForLevelUp(player);

}