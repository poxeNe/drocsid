import { Character } from "../character/Character";
import { prism } from "../util/prism";

export const printInventory = (player: Character) => {
    let i = 1;

    console.log(`\n${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") } ${ prism("INVENTORY", "yellow") } ${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") }`);

    for (const item of player.inventory) {
        console.log(prism(`  -[ `, "blue") + prism(i, "white") + prism(` ] `, "blue") + prism(`${ item }`, "white"));
        i++;
    }

}
