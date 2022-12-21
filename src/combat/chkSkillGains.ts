import { lib } from "../util/lib";
import { Character } from "../character/Character";
import {drocsay} from "../util/drocsay";

export const chkSkillGains = (player: Character, skillUsed: string) => {
    let gripType: "oneHandWeapons" | "twoHandWeapons";
    let skillType: "One-Hand Weapons" | "Two-Hand Weapons";

    if (player.equipped.rightHand?.gripType === 1) {
        gripType = "oneHandWeapons";
        skillType = "One-Hand Weapons";
    } else if (player.equipped.rightHand?.gripType === 2) {
        gripType = "twoHandWeapons";
        skillType = "Two-Hand Weapons";
    } else {
        throw new Error(drocsay("ERROR ] Could not set grip type for your weapon! (chkSkillGains)", "red"));
    }

    if (skillUsed === "physical") {

        const randInt = lib.random.int(1, 100)

        if (player.skills[gripType] < 20) {

            if (randInt <= 85) {
                player.skills[gripType] += 0.1;
                return true;
            }

        }

        if (player.skills[gripType] < 30) {

            if (randInt <= 70) {
                player.skills[gripType] += 0.1;
                return true;
            }

        } else if (player.skills[gripType] < 40) {

            if (randInt <= 60) {
                player.skills[gripType] += 0.1;
                return true;
            }

        } else if (player.skills[gripType] < 50) {

            if (randInt <= 50) {
                player.skills[gripType] += 0.1;
                return true;
            }

        } else if (player.skills[gripType] < 60) {

            if (randInt <= 40) {
                player.skills[gripType] += 0.1;
                return true;
            }

        } else if (player.skills[gripType] < 70) {

            if (randInt <= 30) {
                player.skills[gripType] += 0.1;
                return true;
            }

        } else if (player.skills[gripType] < 80) {

            if (randInt <= 12) {
                player.skills[gripType] += 0.1;
                return true;
            }

        } else if (player.skills[gripType] < 90) {

            if (randInt <= 5) {
                player.skills[gripType] += 0.1;
                return true;
            }

        } else if (player.skills[gripType] < 95) {

            if (randInt <= 1) {
                player.skills[gripType] += 0.1;
                return true;
            }
        } else if (player.skills[gripType] === 100) {
            return false;
        }
    }
}
