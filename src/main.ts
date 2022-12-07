import { mkNewCharacter } from "./character/mkNewCharacter";
// import { items } from "./items/items";
import { actions } from './actions/actions'
// import { Character } from "./character/Character";
import { Weapon, getWeapon } from "./items/Weapon";
import { greeting } from "./greeting";

const main = async () => {

    const { player, playerExists } = await mkNewCharacter();

    await greeting(player);

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

