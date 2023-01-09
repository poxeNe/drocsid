import { Enemy } from "../enemies/Enemy";
import { Player } from "../character/Player";

export const calcEnemyDamage = (player: Player, enemy: Enemy, attackType: string) => {

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
