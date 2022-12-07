import { mkNewCharacter } from "./character/mkNewCharacter";
// import { items } from "./items/items";
import { actions } from './actions/actions'
// import { Character } from "./character/Character";
import { Weapon, getWeapon } from "./items/Weapon";
import { greeting } from "./greeting";

const main = async () => {
    // initialize character creation.
    // TODO: Implement saved games / checking for saved games to load.
    const { player, playerExists } = await mkNewCharacter();

    // initial greeting for new characters.
    await greeting(player);

    // if player character does not exist for some reason, re-run main to initialize character creation again.
    // if it does, initialize action menus.
    if (!playerExists) {
        main();
    } else {
        while (playerExists) {
            await actions(player);
        }
    }

};

// main();
for (let i = 0; i <= 7; i++) {
    let newWeapon;
    newWeapon = getWeapon()
    console.log(newWeapon.prefix + " " + newWeapon.weaponBase + " " + newWeapon.suffix)
}

