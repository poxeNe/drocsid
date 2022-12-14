import { Character } from "../character/Character";
import { Enemy } from "../enemies/Enemy";
import { lib } from "../util/lib";
import readline from "readline/promises";
import { chkForLevelUp } from "../character/chkForLevelUp";

// await lib.misc.sleep(1500);

export const combatAction = async (player: Character, enemy: Enemy) => {

    const calcPlayerDamage = () => {
        let playerPhysicalAttackCause = player.physicalAttack + lib.random.int(player.equipped.leftHand.item.baseMinDamage, player.equipped.leftHand.item.baseMaxDamage) - enemy.physicalDefense;
        if (playerPhysicalAttackCause < 0) { playerPhysicalAttackCause = 0; };
        return playerPhysicalAttackCause;
    }

    const calcEnemyDamage = () => {
        let enemyPhysicalDamageCause = enemy.physicalAttack - player.physicalDefense;
        if (enemyPhysicalDamageCause < 0) { enemyPhysicalDamageCause = 0; };
        return enemyPhysicalDamageCause;
    }

    let playerMagikalDamageCause = player.magikalAttack - enemy.magikalDefense;
    let enemyMagikalDamageCause = enemy.magikalAttack - player.magikalDefense;

    if (playerMagikalDamageCause < 0) { playerMagikalDamageCause = 0; }
    if (enemyMagikalDamageCause < 0) { enemyMagikalDamageCause = 0; }

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
        const playerPhysicalAttackCause = calcPlayerDamage();
        const enemyPhysicalDamageCause = calcEnemyDamage();

        // Prompt the player with the menu and await their response to the question.
        const playerChoice = await rl.question(`\n-[ What would you like to do?:
            \n  -[ 1 ] Physical Attack. \n  -[ 2 ] Magikal Attack. \n  -[ 3 ] Heal. \n  -[ 4 ] Flee.
        `);

        switch (playerChoice) {

            case "1":
                console.log("\n-[ Making a physical attack!"); // TODO: Tell the player what they're swinging with.
                await lib.misc.sleep(1000);

                enemy.currentHealth -= playerPhysicalAttackCause
                console.log(`\n-[ You hit the ${ enemy.baseType } for ${ playerPhysicalAttackCause }! It has ${ enemy.currentHealth } health remaining.`);

                if (enemy.currentHealth <= 0) {
                    player.currentXp += enemy.xpValue
                    player.currentGold += enemy.goldValue
                    console.log(`\n-[ You struck a fatal blow to the ${ enemy.baseType }! You gain ${ enemy.xpValue } experience, and ${ enemy.goldValue } gold pieces!`);
                    break;
                }
                await lib.misc.sleep(1000);

                player.currentHealth -= enemyPhysicalDamageCause;
                if (player.currentHealth <= 0) {
                    console.log(`\n-[ ${ enemy.baseType } has struck a fatal blow! You have perished. \n\n-[ Your deeds of valor shall be remembered.`);
                    process.exit(1);
                }
                console.log(`\n-[ The ${ enemy.baseType } hits you for ${ enemyPhysicalDamageCause }! You have ${ player.currentHealth } remaining!`);
                await lib.misc.sleep(750);
                break;

            case "2":
                console.log("\n-[ Making a magikal attack!"); // TODO: Tell the player what spell they're using.
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
                    console.log("\n-[ You couldn't get away!");
                    break;
                }
        }

    }

    rl.close();
    chkForLevelUp(player);

}