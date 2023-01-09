import { Character } from "../character/Character";
import { prism } from "../util/prism";

export const printSpellsKnown = (player: Character) => {

    console.log(prism(`  - Spells Known: ${ player.spellbook }`, "blue"));
}
