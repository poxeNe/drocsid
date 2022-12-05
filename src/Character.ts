import { tools } from "./util/_lib";
import { items } from "./items";

export type Profession = "warrior" | "mage" | "thief";

// type Spells = {
//     fireball: {}
//     potatoCannon: {}
// }
//
// function useSpell(spellName: keyof Spells) {
//
// }
//
// useSpell('fireball')

// type Spell = {
//     name: string
//     damage: number
// }

// // Way 1: a Map
// const mySpellMap = new Map<string, Spell>();
//
// mySpellMap.set('fireball', {
//     name: 'fireball',
//     damage: 100,
// })
//
// const calledSpell = mySpellMap.get('fireball');
//
// if (!calledSpell) {
//     throw new Error('Spell not found');
// }
//
// // Way 2: An array
// const mySpells: Spell[] = [];
//
// const selectedSpell = mySpells.find(spell => spell.name === 'fireball');

// if (!selectedSpell) {
//     // // some comment
//     // throw new Error("selected spell not found")
// }

// Way 3: an object
// type SpellObj = {
//     [key: string]: Spell
// }
//
// type SpellObj2 = Record<string, Spell>;

type SpellStats = {
    getDamage: () => number
    mp: number
    description: string
}

// type SpellMap = { [key: string]: SpellStats }
// type SpellMap2 = Record<string, SpellStats>

type DamageType = 'physical' | 'magikal';

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
    spellbook: { [spellName: string]: SpellStats } = {};
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
                this.health = 10;
                this.magika = 15;
                this.physicalAttack = 5;
                this.physicalDefense = 1;
                this.magikalAttack = 15;
                this.magikalDefense = 5;
                this.spellbook = {
                    firebolt: {
                        getDamage: () => tools.random.int(3, 14),
                        mp: 3,
                        description: 'Cast a small, fiery flame towards your enemy.',
                    },
                    icebolt: {
                        getDamage: () => tools.random.int(6, 11),
                        mp: 5,
                        description: 'Cast a small, frozen shard towards your enemy.',
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
