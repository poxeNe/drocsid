import { Player } from "../character/Player";
import { prism } from "../util/prism";

export const printSpellsKnown = (player: Player) => {

    console.log(prism(`  - Spells Known: ${ player.spellbook }`, "blue"));
}
