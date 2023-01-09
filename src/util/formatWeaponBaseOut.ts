import {drocsay} from "./drocsay";

export const formatWeaponBaseOut = (weaponBase: string) => {

    switch (weaponBase) {

    //--- MELEE ---//
        case "dagger":
            return "Dagger";

        case "handAxe":
        case "handaxe":
            return "Hand Axe";

        case "javelin":
            return "Javelin";

        case "shortsword":
            return "Shortsword";

        case "doubleAxe":
        case "doubleaxe":
            return "Double Axe";

        case "spear":
            return "Spear";

        case "greatsword":
            return "Greatsword";

        case "greatAxe":
        case "greataxe":
            return "Great Axe";

        case "halberd":
            return "Halberd";

    //--- CASTER ---//
        case "wand":
            return "Wand";

        case "crosier":
            return "Crosier";

        case "shortStaff":
        case "shortstaff":
            return "Short Staff";

        case "longStaff":
        case "longstaff":
            return "Long Staff";

        case "metalStaff":
        case "metalstaff":
            return "Metal Staff";

        case "warStaff":
        case "warstaff":
            return "War Staff";

        default:
            throw new Error(drocsay("ERROR ] Invalid weapon type! (formatWeaponBaseOut)"));
    }

}
