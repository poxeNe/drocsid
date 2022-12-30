import readline from "readline/promises";
import { Character, Profession } from "./Character";
import { getStartingEquipment } from "./getStartingEquipment";
import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";

export const mkNewCharacter = async () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    const name = await rl.question(drocsay(`Welcome to Drocsid! It looks like you\'re new here -- let\'s create a character. What is your name? `, "cyan"));
    let profession = await rl.question(drocsay(`Are you a ${ prism(`warrior`, "red") }, a ${ prism(`thief`, "yellow") }, or a ${ prism(`mage`, "cyan") }? `));

    const possibleProfessions = ["warrior", "thief", "mage"];

    while (!possibleProfessions.includes(profession.trim().toLowerCase())) {
        console.log(drocsay("You must choose either a warrior, thief, or a mage. Let's try again...", "red"));
        profession = await rl.question(drocsay(`Are you a ${ prism(`warrior`, "red") }, a ${ prism(`thief`, "yellow") }, or a ${ prism(`mage`, "cyan") }? `));
    }

    rl.close();

    const player = new Character(name, profession.toLowerCase() as Profession);

    await getStartingEquipment(player);

    return player;
}