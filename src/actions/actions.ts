// noinspection DuplicatedCode

import { lib } from "../util/lib"
import readline from "readline/promises";
import { Player } from "../character/Player";
import { combatAction } from "./combatAction";
import { getEnemy } from "../enemies/Enemy";
import { travelAction } from "./travelAction";
import { restAction } from "./restAction";
import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";
import { printEquippedItems } from "../messages/printEquippedItems";
import { printInventory } from "../messages/printInventory";
import { manageInventory } from "../character/manageInventory";
import { printCharacterSheet } from "../messages/printCharacterSheet";
import { printSpellsKnown } from "../messages/printSpellsKnown";

export const actions = async (player: Player) => {

// Initialization of readline interface.
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    console.log(drocsay("What would you like to do?:", "blue"));

// Prompt the player with the menu and await their response to the question.
    const playerChoice = await rl.question(
    `  ${ prism("-[", "blue") } ${ prism("1", "white") } ${ prism("]", "blue") } ${ prism("Fight", "white") }` +
    `\n  ${ prism("-[", "blue") } ${ prism("2", "white") } ${ prism("]", "blue") } ${ prism("Rest", "white") }` +
    `\n  ${ prism("-[", "blue") } ${ prism("3", "white") } ${ prism("]", "blue") } ${ prism("Travel", "white") }` +
    `\n  ${ prism("-[", "blue") } ${ prism("4", "white") } ${ prism("]", "blue") } ${ prism("Inventory", "white") }` +
    `\n  ${ prism("-[", "blue") } ${ prism("5", "white") } ${ prism("]", "blue") } ${ prism("Player Sheet", "white") }` +
    `\n  ${ prism("-[", "blue") } ${ prism("6", "white") } ${ prism("]", "blue") } ${ prism("Exit", "white") }
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

            printInventory(player);

            await lib.misc.sleep(1000);

            await manageInventory(player);

            await lib.misc.sleep(1500);
            break;

        case "5":
            printCharacterSheet(player);
            printEquippedItems(player);
            printSpellsKnown(player);

            await lib.misc.sleep(1000);
            break;

        case "6":
            console.log(drocsay(`EXIT ] Until next time, ${ player.name }!`, "red"));
            process.exit(1);
            break;

        default:
            console.log(drocsay("ERROR ] Not a valid choice. Try again.", "red"));

            await lib.misc.sleep(1000);

            await actions(player);
    }

// Close the readline interface to prevent multiple instances running and causing problems.
    rl.close();

}
