import readline from "readline/promises";
import { Character, Profession } from "./Character";
import { getStartingEquipment } from "./getStartingEquipment";
import { drocsay } from "../util/drocsay";

export const mkNewCharacter = async () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    const name = await rl.question(drocsay("Welcome to Drocsid! It looks like you\'re new here -- let\'s create a character. What is your name? "));
    let profession = await rl.question(drocsay("Are you a warrior, a thief, or a mage? "));

    const possibleProfessions = ["warrior", "thief", "mage"];

    while (!possibleProfessions.includes(profession.trim().toLowerCase())) {
        console.log(drocsay("You must choose either a warrior, thief, or a mage. Let's try again...", "red"));
        profession = await rl.question(drocsay("Are you a warrior, a thief, or a mage? "));
    }

    rl.close();

    const player = new Character(name, profession.toLowerCase() as Profession);

    await getStartingEquipment(player);

    const addHealingPack = (num: number) => {
        for (let i = 0; i < num; i++) {
            player.inventory.push("Herbs");
        }
    }

    addHealingPack(5);

    return player;
}