import { lib } from "../util/lib";
import { actions } from "../actions/actions";
import { main } from "../main";
import { enemies, Enemies } from "./enemies";
import {items} from "../items/items";

export class Enemy {
    name?: string;
    baseType: string;
    level: number;
    xpValue = 0;
    goldValue = 0;
    area: keyof Enemies;
    currentHealth: number;
    maxHealth: number;
    physicalAttack = 0;
    physicalDefense = 0;
    magikalAttack = 0;
    magikalDefense = 0;
    inventory: string[] = [];

    constructor(area?: keyof Enemies, level?: number) {
        this.area = area ?? this.getRandArea();
        this.baseType = this.getRandomEnemyBase(this.area);
        this.level = level ?? this.getEnemyLevel(this.area);
        this.maxHealth = this.getEnemyHealth(this.level);
        this.currentHealth = this.maxHealth;
        this.getEnemyXPValue(this.level, this.maxHealth);
        this.getEnemyGoldValue(this.level);
        this.getEnemyAttack(this.baseType, this.level);
        this.getEnemyDefense(this.baseType, this.level);
        this.getInventory(this.area, this.baseType);
    }

    getRandomEnemyBase = (area: keyof Enemies): string => {
        return lib.random.choice(enemies[area]);
    }

    getInventory = (area: keyof Enemies, baseType: string) => {
        if (area.toLowerCase().includes("forest")) {
            const randInt = lib.random.int(1, 1);

            if (randInt === 1) {
                this.giveItem(items.drops.forest.herbs, 1);
            }
        }

        if (area.toLowerCase().includes("swamps")) {
            this.inventory.push("Swamp things");
        }

        if (area.toLowerCase().includes("mountains")) {
            this.inventory.push("Mountain things");
        }

        if (baseType.toLowerCase() === "bandit") {
            this.inventory.push("Bandit things");
        }

        if (baseType.toLowerCase() === "forest squirrel") {
            this.inventory.push("Squirrel things");
        }

        if (baseType.toLowerCase() === "wolf") {
            this.inventory.push("Wolf things");
        }

        if (baseType.toLowerCase() === "brown bear") {
            this.inventory.push("Bear things");
        }

        if (baseType.toLowerCase() === "treant") {
            this.inventory.push("Treant things");
        }

        if (baseType.toLowerCase() === "green-magik satyr") {
            this.inventory.push("Satyr things");
        }
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

    getEnemyGoldValue = (level: number) => {
        this.goldValue = lib.random.int(1, 5);

        for (let i = 1; i < level; i++) {
            this.goldValue += lib.random.int(1, 5);
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

    getEnemyXPValue = (level: number, maxHealth: number) => {

        this.xpValue = maxHealth + (level * 3);

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

    giveItem = (item: any, amount: number) => {
        for (let i = 0; i < amount; i++) {
            this.inventory.push(item);
        }
    }

}

export const getEnemy = (area?: keyof Enemies, level?: number) => new Enemy(area, level);

// console.log(enemy);

