import { tools } from "../util/_lib";
import { items } from "../items/items";

export type Profession = "warrior" | "mage" | "thief";

type SpellStats = {
    getDamage: () => number
    mp: number
    description: string
}

type DamageType = 'physical' | 'magikal';

export class Character {
    name: string;
    level = 1;
    currentXp = 0;
    XpToNextLevel = 200;
    profession: Profession;
    currentHealth = 0;
    maxHealth = 0;
    currentMagika = 0;
    maxMagika = 0;
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
    spellbook: { [spellName: string]: SpellStats } = {};
    equipment = {
        weapon: {
        },
        armor: {
        },
    };

    constructor(name: string, profession: Profession,) {
        this.name = name;
        this.profession = profession;

        // Add more stat blocks depending on the profession the player chooses.
        switch (profession) {
            case "warrior":
                this.currentHealth = 20;
                this.maxHealth = 20;
                this.currentMagika = 5;
                this.maxMagika = 5;
                this.physicalAttack = 10;
                this.physicalDefense = 5;
                this.magikalAttack = 5;
                this.magikalDefense = 1;
                this.skills.twoHandWeapons += 10.1;
                this.skills.heavyArmor += 10.1;
                this.skills.healing += 5.1;
                break;

            case "thief":
                this.currentHealth = 15;
                this.maxHealth = 15;
                this.currentMagika = 10;
                this.maxMagika = 10;
                this.physicalAttack = 7;
                this.physicalDefense = 3;
                this.magikalAttack = 5;
                this.magikalDefense = 3;
                this.skills.oneHandWeapons += 10.1;
                this.skills.lightArmor += 10.1;
                this.skills.healing += 5.1;
                break;

            case "mage":
                this.currentHealth = 10;
                this.maxHealth = 10;
                this.currentMagika = 15;
                this.maxMagika = 15;
                this.physicalAttack = 5;
                this.physicalDefense = 1;
                this.magikalAttack = 15;
                this.magikalDefense = 5;
                this.spellbook = {
                    firebolt: {
                        getDamage: () => tools.random.int(3, 14),
                        mp: 3,
                        description: 'Shoot a small, fiery ember towards your enemy.',
                    },
                    // icebolt: {
                    //     getDamage: () => tools.random.int(6, 11),
                    //     mp: 5,
                    //     description: 'Shoot a small, frozen shard towards your enemy.',
                    // },
                };
                this.skills.evocation += 10.1;
                this.skills.meditation += 10.1;
                this.skills.healing += 5.1;
                break;

            default:
                break;
        }
    }

    // TODO: We need to fix this damage calculation
/*
    doDamage(damageType: DamageType, spellName: string): { damage: number, isCritical: boolean } {

        const isCritical = tools.random.int(1, 100) <= this.criticalChance;

        switch (damageType) {

            case "physical":
                let physicalDamage = (this.physicalAttack + this.equipment.weapon.damage);

                if (isCritical) {
                    physicalDamage = physicalDamage * this.criticalModifier;
                }

                return { damage: physicalDamage, isCritical };

            case "magikal":
                const spell = this.spellbook[spellName];

                if (!spell) {
                    throw new Error('Spell not found');
                }

                let magicDamage = this.magikalAttack + spell.getDamage();

                if (isCritical) {
                    magicDamage = magicDamage * this.criticalModifier;
                }

                return { damage: magicDamage, isCritical };
        }
    }
*/

}
