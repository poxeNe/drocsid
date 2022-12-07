"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkNewCharacter = void 0;
const promises_1 = __importDefault(require("readline/promises"));
const Character_1 = require("./Character");
const main_1 = require("./main");
const mkNewCharacter = async () => {
    const rl = promises_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    const name = await rl.question("\n-[ Welcome to Drocsid! It looks like you\'re new here -- let\'s create a character. What is your name? ");
    let profession = await rl.question("\n-[ Are you a warrior, a thief, or a mage? ");
    const possibleProfessions = ["warrior", "thief", "mage"];
    while (!possibleProfessions.includes(profession.trim().toLowerCase())) {
        console.log("\n-[ You must choose either a warrior, thief, or a mage. Let's try again.");
        profession = await rl.question("\n-[ Are you a warrior, a thief, or a mage? ");
    }
    rl.close();
    const player = new Character_1.Character(name, profession.toLowerCase());
    // console.log(player);
    main_1.NEW_PLAYER = false;
    return player;
};
exports.mkNewCharacter = mkNewCharacter;
