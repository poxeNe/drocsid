import { tools } from "../util/_lib"
import { items } from "./items";
import { affixes } from "./affixes";

export class Weapon {
    weaponBase: string
    rarity: string
    prefix?: string
    suffix?: string

    constructor(rarity?: string, baseType?: string) { // YAGNI
        this.weaponBase = baseType ?? this.getRandWepBase();
        this.rarity = rarity ?? this.getRandRarity();
        this.checkAffixes(this.rarity);
    }

    getRandWepBase = (): string => {
        const randBase: "melee" | "caster" = tools.random.choice(["melee", "caster"]);
        return tools.random.choice(items.bases.normal[randBase]);
    }

    getRandRarity = () => {
        const randFloat = tools.random.float();

        if (randFloat < 0.25) {
            return "Magikal";
        } else if (randFloat < 0.55) {
            return "Uncommon";
        } else if (randFloat < 1.0) {
            return "Common";
        } else {
            return "Common";
        }
    }

    checkAffixes = (rarity: string) => {
        if (rarity !== "Common") {
            this.getRandAffixes(rarity);
        }

        return;
    }

    getRandAffixes = (rarity: string) => {
        let prefix: string
        let suffix: string
        const randInt1 = tools.random.int(1, 2);
        const randInt2 = tools.random.int(1, 3);

        const getRandPrefix = (): string => tools.random.choice(affixes.prefixes);
        const getRandSuffix = (): string => tools.random.choice(affixes.suffixes);

        switch (rarity) {
            case "Common":
                break;

            case "Uncommon":
                if (randInt1 === 1) {
                    this.prefix = getRandPrefix();
                } else if (randInt1 === 2) {
                    this.suffix = getRandSuffix();
                }
                break;

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

// const getRandWepBase = (): string => {
//     const randBase: "melee" | "caster" = tools.random.choice(["melee", "caster"]);
//     return tools.random.choice(items.bases.normal[randBase]);
// }

// const getAffixes = (rarity): string => {
//     const prefix
// }

export const getWeapon = (rarity?: string, baseType?: string) => new Weapon(rarity, baseType);

