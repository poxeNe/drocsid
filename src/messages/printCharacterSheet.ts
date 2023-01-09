import { Player } from "../character/Player";
import {prism} from "../util/prism";

export const printCharacterSheet = (player: Player) => {

    console.log(`\n${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") } ${ prism("CHARACTER", "yellow") } ${ prism("-[", "cyan") }${ prism("-=-", "magenta") }${ prism("]-", "cyan") }`);
    console.log(prism(`  - Level: ${ player.level }` +
        `\n  - XP: ${ player.currentXp }` +
        `\n  - Gold: ${ player.currentGold }` +
        `\n  - Current Area: ${ player.area }`, "blue"));

}
