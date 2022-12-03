import { tools } from '../src/util/_lib'
import { affixes } from "./affixes";

export const items = {
    weapons: {
        dagger: {
            base: "Dagger",
            prefix: affixes.prefixes.weapon.rusty.prefix,
            suffix: "",
            damage: 1 + affixes.prefixes.weapon.rusty.mod,
        },
    },
    armor: {
        robes: {
            base: "Robes",
            prefix: "",
            suffix: affixes.suffixes.armor.initiate.suffix,
            ac: 1,
        },
    },
}
