import { lib } from "../util/lib";
import { actions } from "../actions/actions";
import { main } from "../main";
import { enemies, Enemies } from "./enemies";

export class Enemy {
    name?: string
    baseType: string
    level: number
    area: keyof Enemies
    currentHealth: number
    maxHealth: number

    constructor(area?: keyof Enemies, level?: number) {
        this.area = area ?? this.getRandArea();
        this.baseType = this.getRandomEnemyBase(this.area);
        this.level = level ?? this.getEnemyLevel(this.area);
        this.maxHealth = this.getEnemyHealth(this.level);
        this.currentHealth = this.maxHealth;
    }

    getRandomEnemyBase = (area: keyof Enemies): string => {
        return lib.random.choice(enemies[area]);
    }

    getRandArea = (): keyof Enemies => {
        return lib.random.choice(["forest", "swamps", "mountains"]);
    }

    getEnemyLevel = (area: string) => {
        // Randomly roll enemy level depending on the area they spawn in.
        if (area.toLowerCase() === "forest") {
            return lib.random.int(1, 3);
        } else if (area.toLowerCase() === "swamps") {
            return lib.random.int(3, 5);
        } else if (area.toLowerCase() === "mountains") {
            return lib.random.int(5, 7);
        } else {
            throw new Error("-[ ERROR ] Unknown area type! Monster couldn't be generated!");
        }
    }

    getEnemyHealth = (level: number) => {
        // Determine random base health for the enemy.
        const baseHealth = lib.random.int(10, 20);
        let healthIncreasePerLevel = 0;
        let enemyHealth = baseHealth;

        // Simulate health increases from leveling up with this loop.
        for (let i = 1; i < level; i++) {
            healthIncreasePerLevel = lib.random.int(3, 10);
            enemyHealth += healthIncreasePerLevel;
        }

        return enemyHealth;
    }

}

export const getEnemy = (area?: keyof Enemies, level?: number) => new Enemy(area, level);

// console.log(enemy);

