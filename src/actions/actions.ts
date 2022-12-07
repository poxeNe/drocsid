import readline from "readline/promises";
import { Character } from "../character/Character";

export const actions = async (player: Character) => {

    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });

    const playerChoice = await rl.question(`\n-[ What would you like to do?:
        \n  -[ 1 ] Fight. \n  -[ 2 ] Rest. \n  -[ 3 ] Travel. \n  -[ 4 ] Exit.
    `);

    switch (playerChoice) {
        case "1": // TODO: Combat
            console.log("Hello from choice #1");
            break;

        case "2": // TODO: Rest.
            console.log("Hello from choice #2!");
            break;

        case "3": // TODO: Travel.
            console.log("Hello from choice #3!");
            break;

        case "4":
            console.log(`\n-[ EXIT ] Until next time, ${ player.name }!`);
            process.exit(1);
    }

    rl.close();
}
