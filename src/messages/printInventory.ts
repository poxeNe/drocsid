import { Player } from "../character/Player";
import { prism } from "../util/prism";
import {drocsay} from "../util/drocsay";

export const printInventory = (player: Player) => {
    let i = 1;

    console.log(`\n${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") } ${ prism("INVENTORY", "yellow") } ${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") }`);

    if (player.inventory.length > 0) {
        for (const item of player.inventory) {
            console.log(prism(`  -[ `, "blue") + prism(i, "white") + prism(` ] `, "blue") + prism(`${item.name}`, "white"));
            i++;
        }
    } else {
        console.log(drocsay("You are not currently carrying anything.", "yellow"));
    }

}
