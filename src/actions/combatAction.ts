import { Player } from "../character/Player";
import { Enemy } from "../enemies/Enemy";
import { lib } from "../util/lib";
import readline from "readline/promises";
import { chkForLevelUp } from "../character/chkForLevelUp";
import { healingAction } from "./healingAction";
import { fleeAction } from "./fleeAction";
import { calcPlayerDamage } from "../combat/calcPlayerDamage";
import { calcEnemyDamage } from "../combat/calcEnemyDamage";
import { mkAttackRoll } from "../combat/mkAttackRoll";
import { chkCombatSkillGains } from "../combat/chkCombatSkillGains";
import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";
import { chkPlayerAlive } from "../combat/chkPlayerAlive";
import {printSkillGains} from "../messages/printSkillGains";

export const combatAction = async (player: Player, enemy: Enemy) => {

// Initialization of readline interface.
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    console.log(drocsay("Picking a fight..."));
    await lib.misc.sleep(1500);

    console.log(drocsay(`A wild ${ prism(`level ${enemy.level} ${ enemy.baseType }`, "magenta") } appears!`));
    await lib.misc.sleep(1000);

    // TODO: Make striking first random

    while (enemy.currentHealth > 0) {
        // const playerPhysicalAttackCause = calcPlayerDamage();
        // const enemyPhysicalDamageCause = calcEnemyDamage();

        console.log(drocsay("What would you like to do?: ", "blue"));

    // Prompt the player with the menu and await their response to the question.
        const playerChoice = await rl.question(
            `  ${ prism("-[", "blue") } ${ prism("1", "white") } ${ prism("]", "blue") } ${ prism("Physical Attack", "white") }` +
            `\n  ${ prism("-[", "blue") } ${ prism("2", "white") } ${ prism("]", "blue") } ${ prism("Magikal attack", "white") }` +
            `\n  ${ prism("-[", "blue") } ${ prism("3", "white") } ${ prism("]", "blue") } ${ prism("Heal", "white") }` +
            `\n  ${ prism("-[", "blue") } ${ prism("4", "white") } ${ prism("]", "blue") } ${ prism("Flee", "white") }
        `);

        switch (playerChoice) {

        //--- PHYSICAL ATTACK ---//
            case "1":
                console.log(drocsay(`You swing your ${ player.equipped.rightHand?.name }...`, "yellow"));

                await lib.misc.sleep(1000);

            // Roll to see if we hit or not.
            // If we successfully hit, do these things.
                if (await mkAttackRoll()) {
                    enemy.currentHealth -= await calcPlayerDamage(player, enemy, "physical");

                    if (enemy.currentHealth > 0) {
                        console.log(drocsay(`You strike the ${ prism(`${ enemy.baseType }`, "magenta") } for ${ prism(`${ await calcPlayerDamage(player, enemy, "physical") }`, "yellow") }! It has ${ prism(`${ enemy.currentHealth } health`, "red") } remaining.`));
                        await lib.misc.sleep(1000);

                    } else if (enemy.currentHealth <= 0) {

                    // When the enemy has no health remaining, award gold and experience.
                        player.currentXp += enemy.xpValue;
                        player.currentGold += enemy.goldValue;

                        console.log(drocsay(`You strike the ${ prism(`${ enemy.baseType }`, "magenta") } for ${ prism(`${ await calcPlayerDamage(player, enemy, "physical") }`, "yellow") }! It was ${ prism("slain", "red") }!`));
                        await lib.misc.sleep(1000);

                        if (await chkCombatSkillGains(player, "physical")) {
                            let skillType: "oneHandWeapons" | "twoHandWeapons";

                            if (player.equipped.rightHand?.gripType === 1) {
                                skillType = "oneHandWeapons";
                            } else if (player.equipped.rightHand?.gripType === 2) {
                                skillType = "twoHandWeapons";
                            } else {
                                throw new Error(drocsay("ERROR ] Could not determine skillType! (combatAction)", "red"));
                            }

                            printSkillGains(player, skillType);

                            await lib.misc.sleep(1000);
                        }

                        console.log(drocsay(`You gain ${ prism(`${ enemy.xpValue } experience`, "blue") }, and ${ prism(`${ enemy.goldValue } gold pieces`, "yellow") }!`));

                        await lib.misc.sleep(1000);

                    // For each item in the enemy's inventory, add it to ours.

                        for (const item of enemy.inventory) {
                            player.giveItem(item, 1);
                        }

                        console.log(drocsay(`The enemy dropped ${ prism(`${ lib.array.commas(enemy.inventory) }`, "magenta") }. You put the things in your pack.`));

                        break;
                    }

                // Roll to see if we gain any skills or not.
                    if (await chkCombatSkillGains(player, "physical")) {
                        let skillType: "oneHandWeapons" | "twoHandWeapons";

                        if (player.equipped.rightHand?.gripType === 1) {
                            skillType = "oneHandWeapons";
                        } else if (player.equipped.rightHand?.gripType === 2) {
                            skillType = "twoHandWeapons";
                        } else {
                            throw new Error(drocsay("ERROR ] Could not determine skillType! (combatAction)", "red"));
                        }

                        printSkillGains(player, skillType);

                        await lib.misc.sleep(1000);
                    }

                } else {
                    console.log(drocsay("You missed!", "yellow"));
                    await lib.misc.sleep(1000);
                }

            // Calculate enemy's damage to us.
                player.currentHealth -= calcEnemyDamage(player, enemy, "physical");

            // When the player has no health remaining, display a message and then exit the game.
    /* TODO: implement different penalties on death, especially after we have save games, as the player would just be able
        to reload the game and keep playing.
     */
                await chkPlayerAlive(player, enemy);

                console.log(drocsay(`The ${ prism(`${ enemy.baseType }`, "magenta") } hits you for ${ prism(`${ calcEnemyDamage(player, enemy, "physical") }`, "yellow") }! You have ${ prism(`${ player.currentHealth } health`, "yellow") } remaining!`));

                await lib.misc.sleep(1000);

                break;

        //--- MAGIKAL ATTACK ---//
            case "2":
                console.log(drocsay("Making a magikal attack!", "yellow")); // TODO: Tell the player what spell they're using.

                break;

        //--- HEALING ACTION ---//
            case "3": // TODO: Implement healing action.
                await healingAction(player);

                await lib.misc.sleep(1000);

            // Calculate enemy's damage to us.
                player.currentHealth -= calcEnemyDamage(player, enemy, "physical");

                console.log(drocsay(`The ${ prism(`${ enemy.baseType }`, "magenta") } hits you for ${ prism(`${ calcEnemyDamage(player, enemy, "physical") }`, "yellow") }! You have ${ prism(`${ player.currentHealth } health`, "yellow") } remaining!`));

                await chkPlayerAlive(player, enemy);

                await lib.misc.sleep(1000);

                break;

        //--- FLEE ACTION ---//
            case "4": // TODO: Variation to flee chance?
                const playerFlee = await fleeAction();

                if (playerFlee) {
                    return;

                } else {

                // Calculate enemy's damage to us.
                    player.currentHealth -= calcEnemyDamage(player, enemy, "physical");

                    console.log(drocsay(`The ${ prism(`${ enemy.baseType }`, "magenta") } hits you for ${ prism(`${ calcEnemyDamage(player, enemy, "physical") }`, "yellow") }! You have ${ prism(`${ player.currentHealth } health`, "yellow") } remaining!`));

                    await chkPlayerAlive(player, enemy);

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
