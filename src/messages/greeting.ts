import { lib } from "../util/lib"
import { Player } from "../character/Player";
import { drocsay } from "../util/drocsay";

export const greeting = async (player: Player) => {

    if (!player) {
        console.log(drocsay("ERROR ] Player not found! Exiting...", "red"));
        process.exit(1)
    } else {
        console.log(drocsay(`Greetings, ${ player.name }! Go forth, ye mighty level ${ player.level } ${ player.profession }, and make your mark in the world!`, "cyan"));
        await lib.misc.sleep(2000);
    }

}
