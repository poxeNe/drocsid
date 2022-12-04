import { mkNewCharacter } from "./mkNewCharacter";
import { items } from "./items";
import { actions } from './actions'
import { Character } from "./Character";

const run = async () => {

    const player = await mkNewCharacter();

    await actions(player);

    run();

};

run();
//

