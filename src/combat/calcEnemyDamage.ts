import { Enemy } from "../enemies/Enemy";
import { Character } from "../character/Character";

export const calcEnemyDamage = (player: Character, enemy: Enemy, attackType: string) => {

    if (attackType === 'physical') {
        let enemyPhysicalDamageCause = enemy.physicalAttack - player.physicalDefense;

        if (enemyPhysicalDamageCause < 0) {
            enemyPhysicalDamageCause = 0;
        }

        return enemyPhysicalDamageCause;
    }

    if (attackType === 'magikal') {

        return 0;
    }

    throw new Error("-[ ERROR ] No attack type was found. (calcEnemyDamage)")

}
