import { lib } from "../../util/lib";
import { Character } from "../../character/Character";

export const chkHealingSkillGains = (player: Character) => {

    const randInt = lib.random.int(1, 100)

    if (player.skills.healing < 20) {

        if (randInt <= 85) {
            player.skills.healing += 0.1;
            return true;
        }

    }

    if (player.skills.healing < 30) {

        if (randInt <= 70) {
            player.skills.healing += 0.1;
            return true;
        }

    } else if (player.skills.healing < 40) {

        if (randInt <= 60) {
            player.skills.healing += 0.1;
            return true;
        }

    } else if (player.skills.healing < 50) {

        if (randInt <= 50) {
            player.skills.healing += 0.1;
            return true;
        }

    } else if (player.skills.healing < 60) {

        if (randInt <= 40) {
            player.skills.healing += 0.1;
            return true;
        }

    } else if (player.skills.healing < 70) {

        if (randInt <= 30) {
            player.skills.healing += 0.1;
            return true;
        }

    } else if (player.skills.healing < 80) {

        if (randInt <= 12) {
            player.skills.healing += 0.1;
            return true;
        }

    } else if (player.skills.healing < 90) {

        if (randInt <= 5) {
            player.skills.healing += 0.1;
            return true;
        }

    } else if (player.skills.healing < 95) {

        if (randInt <= 1) {
            player.skills.healing += 0.1;
            return true;
        }
    } else if (player.skills.healing === 100) {
        return false;
    }

}
