import { tools } from '../src/util/_lib'
import { affixes } from "./affixes";

// Weapon Definition or Stateful (or Instance) Weapon
// class WeaponType {
//     getName() {
//
//     }
// }
//
// class Weapon {
//     type: WeaponType
//     health: number = 100
// }
//
//
// export const getBaseItem = (): Weapon => {
//
// }

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
