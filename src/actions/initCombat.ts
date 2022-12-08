import { Character } from "../character/Character";
import { Enemy } from "../enemies/Enemy";
import { lib } from "../util/lib";
import readline from "readline/promises";

// await lib.misc.sleep(1500);

export const initCombat = async (player: Character, enemy: Enemy) => {
    let playerPhysicalAttackCause = player.physicalAttack - enemy.physicalDefense;
    let enemyPhysicalDamageCause = enemy.physicalAttack - player.physicalDefense;
    let playerMagikalDamageCause = player.magikalAttack - enemy.magikalDefense;
    let enemyMagikalDamageCause = enemy.magikalAttack - player.magikalDefense;

    if (playerPhysicalAttackCause < 0) { playerPhysicalAttackCause = 0; }
    if (enemyPhysicalDamageCause < 0) { enemyPhysicalDamageCause = 0; }
    if (playerMagikalDamageCause < 0) { playerMagikalDamageCause = 0; }
    if (enemyMagikalDamageCause < 0) { enemyMagikalDamageCause = 0; }




    // Initialization of readline interface.
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    console.log(`\n-[ A wild ${ enemy.baseType } appears!`)
    await lib.misc.sleep(1000);

    // TODO: Make striking first random

    while (enemy.currentHealth > 0) {

        // Prompt the player with the menu and await their response to the question.
        const playerChoice = await rl.question(`\n-[ What would you like to do?:
            \n  -[ 1 ] Physical Attack. \n  -[ 2 ] Magikal Attack. \n  -[ 3 ] Heal. \n  -[ 4 ] Flee.
        `);

        switch (playerChoice) {
            case "1":
                console.log("\n-[ Making a physical attack!");
                await lib.misc.sleep(750);

                enemy.currentHealth -= playerPhysicalAttackCause
                if (enemy.currentHealth <= 0) {
                    player.currentXp += enemy.xpValue
                    console.log(`\nYou struck a fatal blow to the ${ enemy.baseType }! You gain ${ enemy.xpValue } experience!`);
                    break;
                }
                console.log(`\n-[ You hit the ${ enemy.baseType } for ${ playerPhysicalAttackCause }! It has ${ enemy.currentHealth } health remaining.`);
                await lib.misc.sleep(750);

                player.currentHealth -= enemyPhysicalDamageCause;
                if (player.currentHealth <= 0) {
                    console.log(`\n-[ ${ enemy.baseType } has struck a fatal blow! You have perished. \n-[ Your deeds of valor shall be remembered.`);
                    process.exit(1);
                }
                console.log(`\n-[ The ${ enemy.baseType } hits you for ${ enemyPhysicalDamageCause }! You have ${ player.currentHealth } remaining!`);
                break;

            case "2":
                console.log("\n-[ Making a magikal attack!");
                break;

            case "3":
                console.log("\n-[ Healing...");
                break;

            case "4":
                console.log("\n-[ Attempting to flee...");
                lib.misc.sleep(1500);
                if (lib.random.int(1, 3) === 3) {
                    console.log("\n-[ You successfully got away!");
                    return;
                } else {
                    console.log("\n-[ You couldn't get away!")
                    break;
                }
        }

    }


}