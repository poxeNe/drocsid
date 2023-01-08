import { lib } from "../util/lib";
import { items } from "../items/items";
import { getWeapon, WeaponStats} from "../items/Weapon";
import { getStartingEquipment } from "./getStartingEquipment";

export type Areas = "forest" | "swamps" | "mountains"
export type Profession = "warrior" | "mage" | "thief";

type SpellStats = {
    getDamage: () => number
    mp: number
    description: string
}
// what else

export type EquipSlots = {
    leftHand: WeaponStats | null;
    rightHand: WeaponStats | null;
    handArmor: WeaponStats | null;
    chestArmor: WeaponStats | null;
    legArmor: WeaponStats | null;
    amulet: WeaponStats | null;
    leftRing: WeaponStats | null;
    rightRing: WeaponStats | null;
}

const getDefaultEquipment = (): EquipSlots => {
    return {
        leftHand: null,
        rightHand: null,
        handArmor: null,
        chestArmor: null,
        legArmor: null,
        amulet: null,
        leftRing: null,
        rightRing: null,
    }
}

type DamageType = 'physical' | 'magikal';

export class Character {
    name: string;
    // status = "";
    level = 1;
    currentXp = 0;
    xpToNextLevel = 200;
    currentGold = 0;
    profession: Profession;
    currentHealth = 0;
    maxHealth = 0;
    currentMagika = 0;
    maxMagika = 0;
    physicalAttack = 0;
    physicalDefense = 0;
    magikalAttack = 0;
    magikalDefense = 0;
    criticalChance = 20;
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
    equipped: EquipSlots = getDefaultEquipment();
    inventory: string[] = [];
    area: Areas = "forest";

    constructor(name: string, profession: Profession) {
        this.name = name;
        this.profession = profession;

        // Add more stat blocks depending on the profession the player chooses.
        switch (profession) {
            case "warrior":
                this.currentHealth = 20;
                this.maxHealth = 20;
                this.currentMagika = 5;
                this.maxMagika = 5;
                this.physicalAttack = 5;
                this.physicalDefense = 2;
                this.magikalAttack = 1;
                this.magikalDefense = 0;
                this.skills.twoHandWeapons += 10;
                this.skills.heavyArmor += 10;
                this.skills.healing += 5;
                break;

            case "thief":
                this.currentHealth = 15;
                this.maxHealth = 15;
                this.currentMagika = 10;
                this.maxMagika = 10;
                this.physicalAttack = 3;
                this.physicalDefense = 1;
                this.magikalAttack = 3;
                this.magikalDefense = 1;
                this.skills.oneHandWeapons += 10;
                this.skills.lightArmor += 10;
                this.skills.healing += 5;
                break;

            case "mage":
                this.currentHealth = 10;
                this.maxHealth = 10;
                this.currentMagika = 15;
                this.maxMagika = 15;
                this.physicalAttack = 1;
                this.physicalDefense = 0;
                this.magikalAttack = 5;
                this.magikalDefense = 3;
                this.spellbook = {
                    firebolt: {
                        getDamage: () => lib.random.int(3, 14),
                        mp: 3,
                        description: "Shoot a small, fiery ember towards your enemy.",
                    },
                    // icebolt: {
                    //     getDamage: () => lib.random.int(6, 11),
                    //     mp: 5,
                    //     description: "Shoot a small, frozen shard towards your enemy.",
                    // },
                };
                this.skills.evocation += 10;
                this.skills.meditation += 10;
                this.skills.healing += 5;
                break;

            default:
                break;

        }

    }

    chkMaxHealth = (currentHealth: number) => {
        if (currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }

    giveItem = (item: string, amount: number) => {
        for (let i = 0; i < amount; i++) {
            this.inventory.push(item);
        }
    }

    equipItem = (itemToEquip: WeaponStats, location: keyof EquipSlots) => {
        this.equipped[location] = itemToEquip;
    }

    unequipItem = (location: keyof EquipSlots) => {
        this.equipped[location] = null;
    }

}
