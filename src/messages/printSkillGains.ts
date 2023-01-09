import {Player, SkillTypes} from "../character/Player";
import { drocsay } from "../util/drocsay";
import { prism } from "../util/prism";

export const printSkillGains = (player: Player, skillType: SkillTypes) => {
    let skillTypeFormatted = "";

    switch (skillType) {
        case "oneHandWeapons":
            skillTypeFormatted = "One-Hand Weapons";
            break;

        case "twoHandWeapons":
            skillTypeFormatted = "Two-Hand Weapons";
            break;

        case "lightArmor":
            skillTypeFormatted = "Light Armor";
            break;

        case "heavyArmor":
            skillTypeFormatted = "Heavy Armor";
            break;

        case "evocation":
            skillTypeFormatted = "Evocation";
            break;

        case "meditation":
            skillTypeFormatted = "Meditation";
            break;

        case "healing":
            skillTypeFormatted = "Healing";
            break;

        case "mining":
            skillTypeFormatted = "Mining";
            break;
    }

    console.log(drocsay(`Your skill with ${ prism(`${ skillTypeFormatted }`, "blue") } has increased by ${ prism(`0.1`, "blue") }! Your ${ prism(`${ skillTypeFormatted }`, "blue") } level is now ${ prism(`${ player.skills[skillType] }`, "blue") }.`));

}
