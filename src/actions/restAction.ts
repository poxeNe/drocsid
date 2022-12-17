import { Character } from "../character/Character";

export const restAction = (player: Character) => {
    console.log(`Hello ${ player.name } from inside the rest action.`);
    return;
}