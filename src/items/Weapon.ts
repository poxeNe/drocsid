import { lib } from "../util/lib"
import { items } from "./items";
import { affixes } from "./affixes";

export class Weapon {
    weaponBase: string
    rarity: string
    prefix?: string
    suffix?: string

    constructor(rarity?: string, baseType?: string) {
        // if a base type is not passed through, roll a random one from all types.
        this.weaponBase = baseType ?? this.getRandWepBase();

        //if a rarity is not passed through, roll a random one.
        this.rarity = rarity ?? this.getRandRarity();

        // take the item rarity and generate appropriate random affixes for the item.
        this.checkAffixes(this.rarity);
    }

    getRandWepBase = (): string => {
        const randBase: "melee" | "caster" = lib.random.choice(["melee", "caster"]);
        return lib.random.choice(items.bases.normal[randBase]);
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
        // if the rarity is anything other than Common, the item gets a prefix, a suffix, or both.
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

            case "Uncommon":
                // uncommon items get either a prefix or a suffix, not both. we roll here to determine which one.
                if (randInt1 === 1) {
                    this.prefix = getRandPrefix();
                } else if (randInt1 === 2) {
                    this.suffix = getRandSuffix();
                }
                break;

            case "Magikal":
                // Magikal items get either a prefix, a suffix, or both. we roll here to determine which one.
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
// }

