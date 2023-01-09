// noinspection DuplicatedCode

import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";
import readline from "readline/promises";
import { Character } from "./Character";
import { actions } from "../actions/actions";


export const manageInventory = async (player: Character) => {

// Initialization of readline interface.
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });


    console.log(drocsay("What would you like to do?:", "blue"));

// Prompt the player with the menu and await their response to the question.
    const playerChoice = await rl.question(
        `  ${ prism("-[", "blue") } ${ prism("1", "white") } ${ prism("]", "blue") } ${ prism("Equip", "white") }` +
        `\n  ${ prism("-[", "blue") } ${ prism("2", "white") } ${ prism("]", "blue") } ${ prism("Drop", "white") }` +
        `\n  ${ prism("-[", "blue") } ${ prism("3", "white") } ${ prism("]", "blue") } ${ prism("Exit", "white") }
    `);

    switch (playerChoice) {
        case "1": // TODO: Equip items
            console.log(drocsay("Which item would you like to equip?:", "blue"));

            const equipChoice = await rl.question(`Which item would you like to equip?`);

            switch (equipChoice) {
                case "1":
                    break;

                case "2":
                    break;

                case "3":
                    break;

                case "4":
                    break;

                case "5":
                    break;

                case "6":
                    break;

                case "7":
                    break;

                case "8":
                    break;

                case "9":
                    break;

                case "10":
                    break;
            }

            break;

        case "2": // TODO: Drop items
            break;

        case "3": // TODO: Exit inventory
            await actions(player);
            break;

        default:
            console.log(drocsay("ERROR ] Not a valid choice. Try again.", "red"));
            await manageInventory(player);
            break;
    }

}
