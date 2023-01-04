
export const formatWeaponBaseOut = (weaponBase: string) => {

    if (weaponBase === "dagger") {
        return "Dagger";
    }

    if (weaponBase === "handAxe" || weaponBase === "handaxe") {
        return "Hand Axe";
    }

    if (weaponBase === "javelin") {
        return "Javelin";
    }

    if (weaponBase === "shortsword") {
        return "Shortsword";
    }

    if (weaponBase === "doubleAxe" || weaponBase === "doubleaxe") {
        return "Double Axe";
    }

    if (weaponBase === "spear") {
        return "Spear";
    }

    if (weaponBase === "greatsword") {
        return "Greatsword";
    }

    if (weaponBase === "greatAxe" || weaponBase === "greataxe") {
        return "Great Axe";
    }

    if (weaponBase === "halberd") {
        return "Halberd";
    }

}
