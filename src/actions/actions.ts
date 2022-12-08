import { lib } from "../util/lib"
import readline from "readline/promises";
import { Character } from "../character/Character";
import { initCombat } from "./initCombat";
import { Enemy, getEnemy } from "../enemies/Enemy";
import { Enemies } from "../enemies/enemies";
import { Areas } from "../character/Character";

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
        case "1": // TODO: Combat
            player.status = "combat";
            console.log("\n-[ Picking a fight...");
            await lib.misc.sleep(1500);
            break;

        case "2": // TODO: Rest.
            console.log("\n-[ Resting...");
            await lib.misc.sleep(1500);
            break;

        case "3": // TODO: Travel.
            if (player.level < 3) {
                console.log("\n-[ The trees and foliage are too thick to see -- you feel lost and can't find a clear path out.");
                await lib.misc.sleep(1500);
            }
            if (player.level >= 3 && player.level < 5) {
                if (player.area === "forest") {
                    player.area = "swamps";
                    console.log("\n-[ After many hours of walking, you realize you've been sloshing around in murky water. " +
                                    "The air is dank and humid, and a foul stench lingers near. You are now in the Swamps.");
                    await lib.misc.sleep(3000);
                } else {
                    // if (currentArea === "swamps") {
                        console.log("\n-[ Your walking path is sodden, and there's a heavy fog in the air -- you feel lost and can't find a clear path out.");
                        await lib.misc.sleep(1500);
                    // }
                }
            }
            if (player.level >= 5 && player.level < 8) {
                if (player.area === "forest" || player.area === "swamps") {
                    player.area = "mountains";
                    console.log("\n-[ The fog finally clears and you find yourself near a very steep valley side. " +
                        "There is a brisk and chilly breeze blowing on you, and you can hear an Eagle screech from up above you. You are now in the Mountains.");
                    await lib.misc.sleep(3000);
                } else {
                    // if (currentArea === "mountains") {
                        console.log("\n-[ The blizzard is creating a wall of cold snow that is paralyzing and almost impossible to see through -- you feel lost and can't find a clear path out.");
                        await lib.misc.sleep(1500);
                    // }
                }
            }
            break;

        case "4":
            console.log(`\n-[ EXIT ] Until next time, ${ player.name }!`);
            process.exit(1);
    }

    // Close the readline interface to prevent multiple instances running and causing problems.
    rl.close();

}
