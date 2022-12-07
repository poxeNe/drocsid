import {Character} from "./character/Character";

export const greeting = (player: Character) => {

    if (!player) {
        console.log("-[ ERROR ] Character not found! Exiting...");
        process.exit(1)
    } else {
        console.log(`\n-[ Greetings, ${ player.name }! Go forth, ye mighty level ${ player.level } ${ player.profession }, and make your mark in the world of Drocsid!`)
    }

}