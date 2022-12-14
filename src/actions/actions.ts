import { lib } from "../util/lib"
import readline from "readline/promises";
import { Character } from "../character/Character";
import { combatAction } from "./combatAction";
import { Enemy, getEnemy } from "../enemies/Enemy";
import { Enemies } from "../enemies/enemies";
import { Areas } from "../character/Character";
import {travelAction} from "./travelAction";

export const actions = async (player: Character) => {

    // Initialization of readline interface.
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    // Prompt the player with the menu and await their response to the question.
    const playerChoice = await rl.question(`\n-[ What would you like to do?:
        \n  -[ 1 ] Fight. \n  -[ 2 ] Rest. \n  -[ 3 ] Travel. \n  -[ 4 ] Exit.
    `);

    // We now use the player's response, or "Promise", to determine which option to trigger.
    switch (playerChoice) {
        case "1":
            await combatAction(player, getEnemy(player.area));
            await lib.misc.sleep(1500);
            break;

        case "2": // TODO: Add resting action.
            console.log("\n-[ Resting...");
            await lib.misc.sleep(1500);
            break;

        case "3":
            await travelAction(player);
            await lib.misc.sleep(1500);
            break;

        case "4":
            console.log(`\n-[ EXIT ] Until next time, ${ player.name }!`);
            process.exit(1);
    }

    // Close the readline interface to prevent multiple instances running and causing problems.
    rl.close();

}
