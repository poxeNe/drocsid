import { Character } from "./Character";
import { lib } from "../util/lib";

export const chkForLevelUp = (player: Character) => {
    if (player.currentXp < player.xpToNextLevel) {
        return;

    } else if (player.currentXp >= player.xpToNextLevel) {
        player.level += 1;

        switch (player.profession) {

        //--- Warrior level-up stat changes.
            case "warrior":
                player.maxHealth += lib.random.int(2, 5);
                player.maxMagika += lib.random.int(1, 2);
                player.physicalAttack += 2;
                player.physicalDefense += 1;
                player.magikalAttack += lib.random.int(0, 1);
                player.magikalDefense += lib.random.int(0, 1);
                break;

        //--- Thief level-up stat changes.
            case "thief":
                player.maxHealth += lib.random.int(2, 3);
                player.maxMagika += lib.random.int(2, 3);
                player.physicalAttack += 1;
                player.physicalDefense += lib.random.int(0, 1);
                player.magikalAttack += 1;
                player.magikalDefense += lib.random.int(0, 1);
                break;

        //--- Mage level-up stat changes.
            case "mage":
                player.maxHealth += lib.random.int(1, 2);
                player.maxMagika += lib.random.int(2, 5);
                player.physicalAttack += lib.random.int(0, 1);
                player.physicalDefense += lib.random.int(0, 1);
                player.magikalAttack += 2;
                player.magikalDefense += 1;
                break;
        }

        player.currentHealth = player.maxHealth;
        player.currentMagika = player.maxMagika;

        player.xpToNextLevel *= 2;

        console.log(`\n-[ You suddenly feel stronger and more resilient... you're now level ${player.level}!`)
    }

}
