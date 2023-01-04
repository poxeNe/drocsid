//------------------------------|
//-        [ Drocsid ]         -|
//-     https://poxeNe.com     -|
//- https://github.com/poxeNe  -|
//------------------------------|

import { mkNewCharacter } from "./character/mkNewCharacter";
import { actions } from './actions/actions'
import { greeting } from "./messages/greeting";

export const main = async () => {
// Initialize character creation.
// TODO: implement saved games / checking for saved games to load. :(
    const player = await mkNewCharacter();

// initial greeting for new characters.
    await greeting(player);

// If player character does not exist for some reason, re-run main to initialize character creation again.
// If it does, initialize actions menu.
    if (!player) {
        main();
    } else {
        while (player) {
            await actions(player);
        }
    }

};

main();
