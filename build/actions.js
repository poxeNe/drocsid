"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const promises_1 = __importDefault(require("readline/promises"));
const actions = async (player) => {
    const rl = promises_1.default.createInterface({
        input: process.stdin,
        output: process.stdin,
        terminal: false,
    });
    const playerChoice = await rl.question(`\n-[ Hello, ${player.name}. What would you like to do?:
        \n  -[ 1) Fight. \n  -[ 2) Rest. \n  -[ 3) Travel.
    `);
    if (playerChoice === "1") {
        console.log("Hello from choice #1!");
        return;
        // TODO: implement combat
    }
    if (playerChoice === "2") {
        console.log("Hello from choice #2!");
        return;
        // TODO: implement resting
    }
    if (playerChoice === "3") {
        console.log("Hello from choice #3!");
        return;
        // TODO: implement exploring
    }
    rl.close();
};
exports.actions = actions;
