import { lib } from "../util/lib"
import { items } from "./items";
import { affixes } from "./affixes";

export interface WeaponStats {
    name: string;
    weaponBase: string;
    baseMinDamage: number;
    baseMaxDamage: number;
    rarity: string;
    prefix?: string;
    suffix?: string;
}

export class Weapon implements WeaponStats {
    name: string;
    weaponBase: string;
    baseMinDamage = 0;
    baseMaxDamage = 0;
    rarity: string;
    prefix?: string;
    suffix?: string;

    constructor(rarity?: string, baseType?: string) {
        // If a base type is not passed through, roll a random one from all types.
        this.weaponBase = baseType ?? this.getRandWepBase();

        // If a rarity is not passed through, roll a random one.
        this.rarity = rarity ?? this.getRandRarity();

        // Take the item rarity and generate appropriate random affixes for the item.
        this.checkAffixes(this.rarity);

        // Generate random minimum and maximum damage depending on the item base type.
        this.getBaseDamage(this.weaponBase);

        this.name = this.getWeaponName(this.weaponBase);
    }

    getRandWepBase = (): string => {
        const randBase: "melee" | "caster" = lib.random.choice(["melee", "caster"]);
        return lib.random.choice(items.bases.normal[randBase]);
    }

    getWeaponName = (weaponBase: string) => {
        let name: string = "";

        if (this.prefix) {
            name += `${this.prefix} `;
        }

        name += weaponBase;

        if (this.suffix) {
            name += `${this.suffix}`;
        }

        return name;
    }

    getBaseDamage = (weaponBase: string) => {
        switch (weaponBase) {

        //--- MELEE WEAPONS ---//
            case "dagger":
                this.baseMinDamage = lib.random.int(1, 2); this.baseMaxDamage = lib.random.int(4, 5);
                break;

            case "handaxe":
                this.baseMinDamage = lib.random.int(2, 3); this.baseMaxDamage = lib.random.int(5, 6);
                break;

            case "shortsword":
                this.baseMinDamage = lib.random.int(3, 4); this.baseMaxDamage = lib.random.int(6, 7);
                break;

            case "doubleaxe":
                this.baseMinDamage = lib.random.int(4, 5); this.baseMaxDamage = lib.random.int(7, 8);
                break;

            case "spear":
                this.baseMinDamage = lib.random.int(1, 2); this.baseMaxDamage = lib.random.int(7, 8);
                break;

            case "halberd":
                this.baseMinDamage = lib.random.int(2, 3); this.baseMaxDamage = lib.random.int(8, 9);
                break;

            case "greatsword":
                this.baseMinDamage = lib.random.int(3, 4); this.baseMaxDamage = lib.random.int(9, 10);
                break;

            case "greataxe":
                this.baseMinDamage = lib.random.int(4, 5); this.baseMaxDamage = lib.random.int(10, 11);
                break;

        //--- CASTER WEAPONS ---//
            case "wand":
                this.baseMinDamage = lib.random.int(1, 2); this.baseMaxDamage = lib.random.int(3, 4);
                break;

            case "crosier":
                this.baseMinDamage = lib.random.int(2, 3); this.baseMaxDamage = lib.random.int(4, 5);
                break;

            case "shortstaff":
                this.baseMinDamage = lib.random.int(3, 4); this.baseMaxDamage = lib.random.int(5, 6);
                break;

            case "longstaff":
                this.baseMinDamage = lib.random.int(4, 5); this.baseMaxDamage = lib.random.int(6, 7);
                break;

            case "metalstaff":
                this.baseMinDamage = lib.random.int(5, 6); this.baseMaxDamage = lib.random.int(7, 8);
                break;

            case "warstaff":
                this.baseMinDamage = lib.random.int(6, 7); this.baseMaxDamage = lib.random.int(8, 9);
                break;

        }

    }

    getRandRarity = () => {
        const randFloat = lib.random.float();

        if (randFloat < 0.25) {
            return "Magikal";
        } else if (randFloat < 0.55) {
            return "Uncommon";
        } else {
            return "Common";
        }

    }

    checkAffixes = (rarity: string) => {

        // If the rarity is anything other than Common, the item gets a prefix, a suffix, or both.
        if (rarity !== "Common") {
            this.getRandAffixes(rarity);
        }

        return;

    }

    getRandAffixes = (rarity: string) => {
        const randInt1 = lib.random.int(1, 2);
        const randInt2 = lib.random.int(1, 3);

        const getRandPrefix = (): string => lib.random.choice(affixes.prefixes);
        const getRandSuffix = (): string => lib.random.choice(affixes.suffixes);

        switch (rarity) {

            case "Common":
                break;

        // Uncommon items get either a prefix or a suffix, not both. we roll here to determine which one.
            case "Uncommon":
                if (randInt1 === 1) {
                    this.prefix = getRandPrefix();
                } else if (randInt1 === 2) {
                    this.suffix = getRandSuffix();
                }
                break;

        // Magikal items get either a prefix, a suffix, or both. we roll here to determine which one.
            case "Magikal":
                if (randInt2 === 1) {
                    this.prefix = getRandPrefix();
                } else if (randInt2 === 2) {
                    this.suffix = getRandSuffix();
                } else if (randInt2 === 3) {
                    this.prefix = getRandPrefix();
                    this.suffix = getRandSuffix();
                }
                break;

        }

    }

}

export const getWeapon = (rarity?: string, baseType?: string) => new Weapon(rarity, baseType);

// for (let i = 0; i <= 7; i++) {
//     let newWeapon;
//     newWeapon = getWeapon()
//     console.log(newWeapon.prefix + " " + newWeapon.weaponBase + " " + newWeapon.suffix)
//     console.log("Damage: " + newWeapon.baseMinDamage + " - " + newWeapon.baseMaxDamage)
// }

