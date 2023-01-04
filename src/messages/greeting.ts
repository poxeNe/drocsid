import { lib } from "../util/lib"
import { Character } from "../character/Character";
import { drocsay } from "../util/drocsay";

export const greeting = async (player: Character) => {

    if (!player) {
        console.log(drocsay("ERROR ] Character not found! Exiting...", "red"));
        process.exit(1)
    } else {
        console.log(drocsay(`Greetings, ${ player.name }! Go forth, ye mighty level ${ player.level } ${ player.profession }, and make your mark in the world!`, "cyan"));
        await lib.misc.sleep(2000);
    }

}
