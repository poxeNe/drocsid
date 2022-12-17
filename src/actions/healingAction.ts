import { Character } from "../character/Character";

export const healingAction = (player: Character) => {
    console.log(`Hello, ${ player.name }, from inside the healing action.`);
    return;
}