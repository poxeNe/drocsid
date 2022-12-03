import { tools } from "./util/_lib";
import { items } from "./items";

export type Profession = "Warrior" | "warrior" | "Mage" | "mage" | "Thief" | "thief";

export class Character {
    name: string;
    profession: Profession;
    health = 0;
    magika = 0;
    physicalAttack = 0;
    physicalDefense = 0;
    magikalAttack = 0;
    magikalDefense = 0;
    criticalChance = 1;
    criticalModifier = 1.5;
    skills = {
        oneHandWeapons: 0,
        twoHandWeapons: 0,
        lightArmor: 0,
        heavyArmor: 0,
        evocation: 0,
        meditation: 0,
        healing: 0,
        mining: 0,
    };
    spells = {};
    equipment = {
        weapon: {
            name: items.weapons.dagger.prefix + items.weapons.dagger.base + items.weapons.dagger.suffix,
            damage: items.weapons.dagger.damage,
        },
        armor: {
            name: items.armor.robes.prefix + items.armor.robes.base + items.armor.robes.suffix,
            ac: items.armor.robes.ac,
        },
    };

    constructor(name: string, profession: Profession,) {
        this.name = name;
        this.profession = profession;

        switch (profession) {
            case "warrior":
            case "Warrior":
                this.health = 20;
                this.magika = 5;
                this.physicalAttack = 10;
                this.physicalDefense = 5;
                this.magikalAttack = 5;
                this.magikalDefense = 1;
                this.skills.twoHandWeapons += 10.1;
                this.skills.heavyArmor += 10.1;
                this.skills.healing += 5.1;
                break;

            case "thief":
            case "Thief":
                this.health = 15;
                this.magika = 10;
                this.physicalAttack = 7;
                this.physicalDefense = 3;
                this.magikalAttack = 5;
                this.magikalDefense = 3;
                this.skills.oneHandWeapons += 10.1;
                this.skills.lightArmor += 10.1;
                this.skills.healing += 5.1;
                break;

            case "mage":
            case "Mage":
                this.health = 10;
                this.magika = 15;
                this.physicalAttack = 5;
                this.physicalDefense = 1;
                this.magikalAttack = 15;
                this.magikalDefense = 5;
                this.spells = {
                    "firebolt": {
                        damage: () => tools.random.int(3, 14),
                        mp: 3,
                    },
                    "icebolt": {
                        damage: () => tools.random.int(6, 11),
                        mp: 5,
                    },
                };
                this.skills.evocation += 10.1;
                this.skills.meditation += 10.1;
                this.skills.healing += 5.1;
                break;

            default:
                break;
        }
    }

    doDamage(damageType: string, spell: string) {

        switch (damageType) {

            case "physical":
                if (tools.random.int(1, 100) <= this.criticalChance) {
                    const damage = (this.physicalAttack + this.equipment.weapon.damage) * this.criticalModifier;
                    return damage;
                } else {
                    const damage = (this.physicalAttack + this.equipment.weapon.damage)
                    return damage;
                }

            case "magikal":
                // if (tools.random.int(1, 100) <= this.criticalChance) {
                //     const damage = (this.magikalAttack + this.spells[`${spell}`].damage) * this.criticalModifier;
                //     return damage;
                // } else {
                //     const damage = (this.magikalAttack + this.spells[spell].damage);
                //     return damage;
                // }
        }
    }
}

// class Thief extends Character {
//     constructor() {
//         this.health = 15;
//     }
// }


/*

const myChar = new Character();

// Character.prototype.doDamage = function(enemy) {
//     this.profession.doDamage(enemy)
// }


    // this.profession = "Thief";
    this.health = 75;
    this.attack = 10;
    this.criticalChance = 0.15;
    this.criticalModifier = 3;



    const damage = Math.random() <= this.criticalChance
        ? this.attack * this.criticalModifier
        : this.attack;
    enemy.health -= damage;
*/
