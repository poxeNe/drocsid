import { Player } from "../character/Player";
import { lib } from "../util/lib";
import { chkHealingSkillGains } from "../combat/healing/chkHealingSkillGains";
import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";
import { printSkillGains } from "../messages/printSkillGains";



export const healingAction = (player: Player) => {
    let i = 0;
    let hasMushrooms = false;

// Check the name of each object in the player's inventory for any Mushrooms, and provide the index so we can splice the item
// off of the inventory array after we "use" it.
    for (const item of player.inventory) {
        if (item.name.toLowerCase() === "mushrooms") {
            hasMushrooms = true;
            break;

        } else {
            i++;
        }
    }

    if (hasMushrooms) {

        if (player.currentHealth >= player.maxHealth) {
            console.log(drocsay("You are already at max health -- you cannot heal right now!", "red"));

            return;
        }

    // Splice, or remove, the first instance of Mushrooms from the player's inventory.
        player.inventory.splice(i, 1);
        let randInt = 0;

    // TODO: Implement different items that heal for different amounts.
        if (hasMushrooms) {
            randInt = lib.random.int(3, 8);
        }

        const healAmount = Math.floor(randInt + player.skills.healing);

        player.currentHealth += healAmount;

        player.chkMaxHealth(player.currentHealth);

        console.log(drocsay(`${ prism(`You eat a handful of`, "white") } ${ prism(`Mushrooms`, "magenta") } ${ prism("and", "white") } ${ prism(`recover ${ healAmount } health`, "green") }! ${ prism(`Your health is now`, "white") } ${ prism(`${ player.currentHealth }`, "green") }.`));

        if (chkHealingSkillGains(player)) {
            printSkillGains(player, "healing");
        }

        return;

    } else {
        console.log(drocsay("You aren't currently carrying any mushrooms -- you cannot heal right now!", "red"));

        return;
    }
}
