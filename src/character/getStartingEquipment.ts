import { Player } from "./Player";
import { getWeapon, Weapon, WeaponStats} from "../items/Weapon";
import { items } from "../items/items";

export const getStartingEquipment = (player: Player) => {

    if (player.profession === "warrior") {
        player.equipItem(getWeapon("common", "greatsword"), "rightHand")
    }

    if (player.profession === "thief") {
        player.equipItem(getWeapon("uncommon", "dagger"), "rightHand")
    }

    if (player.profession === "mage") {
        player.equipItem(getWeapon("magikal", "crosier"), "rightHand")
    }

    player.giveItem(items.drops.forest["mushrooms"], 2);
    player.giveItem(items.drops.forest.herbs, 1);

}
