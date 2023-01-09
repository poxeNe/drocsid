import { Player } from "../character/Player";

export const restAction = (player: Player) => {
    console.log(`Hello ${ player.name } from inside the rest action.`);
    return;
}
