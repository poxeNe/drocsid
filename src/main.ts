import { mkNewCharacter } from "./character/mkNewCharacter";
import { actions } from './actions/actions'
import { greeting } from "./messages/greeting";

export const main = async () => {
    // initialize character creation.
    // TODO: Implement saved games / checking for saved games to load.
    const player = await mkNewCharacter();

    // initial greeting for new characters.
    await greeting(player);

    // if player character does not exist for some reason, re-run main to initialize character creation again.
    // if it does, initialize actions menu.
    if (!player) {
        main();
    } else {
        while (player) {
            // if (player.status === "combat") {}
            await actions(player);
        }
    }

};

main();


