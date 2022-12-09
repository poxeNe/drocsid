import { lib } from "../util/lib";
import { actions } from "../actions/actions";
import { main } from "../main";
import { enemies, Enemies } from "./enemies";

export class Enemy {
    name?: string;
    baseType: string;
    level: number;
    xpValue = 0;
    area: keyof Enemies;
    currentHealth: number;
    maxHealth: number;
    physicalAttack = 0;
    physicalDefense = 0;
    magikalAttack = 0;
    magikalDefense = 0;

    constructor(area?: keyof Enemies, level?: number) {
        this.area = area ?? this.getRandArea();
        this.baseType = this.getRandomEnemyBase(this.area);
        this.level = level ?? this.getEnemyLevel(this.area);
        this.maxHealth = this.getEnemyHealth(this.level);
        this.currentHealth = this.maxHealth;
        this.getEnemyXPValue(this.level);
        this.getEnemyAttack(this.baseType, this.level);
        this.getEnemyDefense(this.baseType, this.level);
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
            return lib.random.int(1, 2);

        } else if (area.toLowerCase() === "swamps") {
            return lib.random.int(3, 5);

        } else if (area.toLowerCase() === "mountains") {
            return lib.random.int(5, 7);

        } else {
            throw new Error("-[ ERROR ] Unknown area type! Monster couldn't be generated!");
        }

    }

    getEnemyAttack = (baseType: string, level: number) => {

        switch (baseType) {

        //--- FOREST ENEMIES ---//
            case "Forest Squirrel":
                this.physicalAttack = lib.random.int(1, 3);
                break;

            case "Wolf":
                this.physicalAttack = lib.random.int(2, 4);
                break;

            case "Brown Bear":
                this.physicalAttack = lib.random.int(2, 5);
                break;

            case "Bandit":
                this.physicalAttack = lib.random.int(2, 5);
                break;

            case "Green-magik Satyr":
                this.magikalAttack = lib.random.int(2, 4);
                break;

            case "Treant":
                this.magikalAttack = lib.random.int(3, 6);
                break;

        }

        for (let i = 1; i < level; i++) {
            this.physicalAttack += lib.random.int(1, 3);
            this.magikalAttack += lib.random.int(1, 3);
        }

    }

    getEnemyDefense = (baseType: string, level: number) => {

        switch (baseType) {

        //--- FOREST ENEMIES ---//
            case "Forest Squirrel":
                this.physicalDefense = 0;
                break;

            case "Wolf":
                this.physicalDefense = lib.random.int(0, 1);
                break;

            case "Brown Bear":
                this.physicalDefense = lib.random.int(1, 2);
                break;

            case "Bandit":
                this.physicalDefense = lib.random.int(0, 2);
                break;

            case "Green-magik Satyr":
                this.physicalDefense = lib.random.int(1, 2);
                this.magikalDefense = lib.random.int(2, 4);
                break;

            case "Treant":
                this.physicalDefense = lib.random.int(1, 2);
                this.magikalDefense = lib.random.int(2, 4);
                break;

        }

        if (baseType === "Forest Squirrel" || baseType === "Wolf" || baseType === "Brown Bear" || baseType === "Bandit") {
            for (let i = 1; i < level; i++) {
                this.physicalDefense += lib.random.int(1, 2);
            }
        }

        if (baseType === "Green-magik Satyr" || baseType === "Treant") {
            for (let i = 1; i < level; i++) {
                this.physicalDefense += lib.random.int(1, 2);
                this.magikalDefense += lib.random.int(1, 2);
            }
        }
    }

    getEnemyXPValue = (level: number) => {
        if (level) {
            this.xpValue = 50;
        }
    }

    getEnemyHealth = (level: number) => {

        // Determine random base health for the enemy.
        const baseHealth = lib.random.int(5, 12);
        let healthIncreasePerLevel = 0;
        let enemyHealth = baseHealth;

        // Simulate health increases from leveling up with this loop.
        for (let i = 1; i < level; i++) {
            healthIncreasePerLevel = lib.random.int(3, 8);
            enemyHealth += healthIncreasePerLevel;
        }

        return enemyHealth;
    }

}

export const getEnemy = (area?: keyof Enemies, level?: number) => new Enemy(area, level);

// console.log(enemy);

