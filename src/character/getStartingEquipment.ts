import { Character } from "./Character";
import { getWeapon, Weapon, WeaponStats} from "../items/Weapon";

export const getStartingEquipment = (player: Character) => {

    if (player.profession === "warrior") {
        player.equipItem(getWeapon("common", "greatsword"), "rightHand")
    }

    if (player.profession === "thief") {
        player.equipItem(getWeapon("uncommon", "dagger"), "rightHand")
    }

    if (player.profession === "mage") {
        player.equipItem(getWeapon("magikal", "crosier"), "rightHand")
    }

    player.giveItem("Herbs", 2);

}
