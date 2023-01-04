import { lib } from "../util/lib";
import { Character } from "../character/Character";
import { drocsay } from "../util/drocsay";


export const travelAction = async (player: Character) => {

    if (player.level < 3) {
        console.log(drocsay("The trees and foliage are too thick to see -- you feel lost and can't find a clear path out.", "yellow"));
        await lib.misc.sleep(1500);
    }
    if (player.level >= 3 && player.level < 5) {
        if (player.area === "forest") {
            player.area = "swamps";
            console.log(drocsay("After many hours of walking, you realize you've been sloshing around in murky water. " +
                "The air is dank and humid, and a foul stench lingers near. You are now in the Swamps.", "yellow"));
            await lib.misc.sleep(3000);
        } else {
            // if (currentArea === "swamps") {
            console.log(drocsay("Your walking path is sodden, and there's a heavy fog in the air -- you feel lost and can't find a clear path out.", "yellow"));
            await lib.misc.sleep(1500);
            // }
        }
    }
    if (player.level >= 5 && player.level < 8) {
        if (player.area === "forest" || player.area === "swamps") {
            player.area = "mountains";
            console.log(drocsay("The fog finally clears and you find yourself near a very steep valley side. " +
                "There is a brisk and chilly breeze blowing on you, and you can hear an Eagle screech from up above you. You are now in the Mountains.", "yellow"));
            await lib.misc.sleep(3000);
        } else {
            // if (currentArea === "mountains") {
            console.log(drocsay("The blizzard is creating a wall of cold snow that is paralyzing and almost impossible to see through -- you feel lost and can't find a clear path out.", "yellow"));
            await lib.misc.sleep(1500);
            // }
        }
    }

    return;
}
