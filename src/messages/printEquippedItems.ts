import { Player } from "../character/Player";
import { WeaponStats } from "../items/Weapon";
import { prism } from "../util/prism";

export const printEquippedItems = (player: Player) => {

    console.log(prism(`  - Equipped Items: `, "blue"));

    for (const [slot, item] of Object.entries(player.equipped)) {
        if (item) {
            console.log(`    ${prism(`- ${slot}:`, "blue")} ${item.name}`);
        } else {
            console.log(`    ${prism(`- ${slot}:`, "blue")} ${prism("--", "grey")}`);
        }

        // const itemDescription = item ? item.name : prism("--", "grey");
        // const message = `    ${prism(`- ${slot}:`, "blue")} ${itemDescription}`;
        //
        // console.log(message);

    }
}
