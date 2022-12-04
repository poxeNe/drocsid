import readline from "readline/promises";
import { Character } from "./Character";

export const actions = async (player: Character) => {

    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdin,
    });

    const playerChoice = await rl.question(`\n-[ Hello, ${ player.name }. What would you like to do?:
        \n  -[ 1) Fight. \n  -[ 2) Rest. \n  -[ 3) Travel.
    `);

    if (playerChoice === "1") {
        console.log("Hello from choice #1!")

        return

        // TODO: implement combat
    }

    if (playerChoice === "2") {
        console.log("Hello from choice #2!")

        return

        // TODO: implement resting
    }

    if (playerChoice === "3") {
        console.log("Hello from choice #3!")

        return

        // TODO: implement exploring
    }

}
