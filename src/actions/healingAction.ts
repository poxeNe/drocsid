import { Character } from "../character/Character";
import { lib } from "../util/lib";
import { chkHealingSkillGains } from "../combat/healing/chkHealingSkillGains";
import { drocsay } from "../util/drocsay";

export const healingAction = (player: Character) => {

    if (player.inventory.includes("Herbs")) {

    // Remove the first instance of herbs from the player's inventory to heal.
        player.inventory.splice(player.inventory.indexOf("Herb", 1))

        const randInt = lib.random.int(3, 8);
        const healAmount = Math.floor(randInt + player.skills.healing);

        player.currentHealth += healAmount;

        console.log(drocsay(`You eat some herbs and recover ${ healAmount } health! Your health is now ${ player.currentHealth }.`, "green"));

        if (chkHealingSkillGains(player)) {
            console.log(drocsay(`Your skill with Healing has increased by 0.1! Your Healing level is now ${ player.skills.healing }.`, "green"));
        }

        return;

    } else {
        console.log(drocsay("You aren't currently carrying any herbs -- you cannot heal right now!", "red"));

        return;
    }
}
