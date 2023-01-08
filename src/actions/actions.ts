import { lib } from "../util/lib"
import readline from "readline/promises";
import { Character, EquipSlots } from "../character/Character";
import { combatAction } from "./combatAction";
import { Enemy, getEnemy } from "../enemies/Enemy";
import { Enemies } from "../enemies/enemies";
import { Areas } from "../character/Character";
import { travelAction } from "./travelAction";
import { restAction } from "./restAction";
import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";
import { printEquippedItems } from "../messages/printEquippedItems";

export const actions = async (player: Character) => {

// Initialization of readline interface.
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    console.log(drocsay("What would you like to do?:", "blue"));

// Prompt the player with the menu and await their response to the question.
    const playerChoice = await rl.question(`\n  ${ prism("-[ 1 ]", "cyan") } ${ prism("Fight", "white") } \n  ${ prism("-[ 2 ]", "cyan") } ${ prism("Rest", "white") } \n  ${ prism("-[ 3 ]", "cyan") } ${ prism("Travel", "white") } \n  ${ prism("-[ 4 ]", "cyan") } ${ prism("Inventory", "white") } \n  ${ prism("-[ 5 ]", "cyan") } ${ prism("Character", "white") } \n  ${ prism("-[ 6 ]", "cyan") } ${ prism("Exit", "white") }
    `);

// We now use the player's response, or "Promise", to determine which option to trigger.
    switch (playerChoice) {
        case "1":
            await combatAction(player, getEnemy(player.area));
            await lib.misc.sleep(1500);
            break;

        case "2": // TODO: Add resting action.
            await restAction(player);
            await lib.misc.sleep(1500);
            break;

        case "3":
            await travelAction(player);
            await lib.misc.sleep(1500);
            break;

        case "4": // TODO: Implement inventory menu that allows you to drop items.
            console.log(drocsay(`Inventory`, "white"));
            await lib.misc.sleep(1500);
            break;

        case "5":
            console.log(drocsay("-=- ]- Character Stats -[ -=- ]-", "cyan"));
            console.log(prism(`  - Level: ${ player.level }` +
            `\n  - XP: ${ player.currentXp }` +
            `\n  - Gold: ${ player.currentGold }` +
            `\n  - Current Area: ${ player.area }`, "blue"));
            console.log(prism(`  - Equipped Items: `, "blue"));

            printEquippedItems(player);

            console.log(prism(`  - Spells Known: ${ player.spellbook }`, "blue"));

            await lib.misc.sleep(1500);
            break;

        case "6":
            console.log(drocsay(`EXIT ] Until next time, ${ player.name }!`, "red"));
            process.exit(1);
            break;

        default:
            throw new Error(drocsay("Not a valid choice. Try again.", "red"));
    }

// Close the readline interface to prevent multiple instances running and causing problems.
    rl.close();

}
