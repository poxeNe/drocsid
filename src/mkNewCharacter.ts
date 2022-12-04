import readline from "readline/promises";
import { Character, Profession } from "./Character";

export const mkNewCharacter = async () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const name = await rl.question("\n-[ Welcome to Drocsid! It looks like you\'re new here -- let\'s create a character. What is your name? ");
    let profession = await rl.question("\n-[ Are you a warrior, a thief, or a mage? ");

    const possibleProfessions = ["warrior", "thief", "mage"];

    while (!possibleProfessions.includes(profession.trim().toLowerCase())) {
        console.log("\n-[ You must choose either a warrior, thief, or a mage. Let's try again.");
        profession = await rl.question("\n-[ Are you a warrior, a thief, or a mage? ");
    }

    rl.close();

    const player = new Character(name, profession.toLowerCase() as Profession);

    // console.log(player);

    return player;

}