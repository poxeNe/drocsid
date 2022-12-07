"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.items = void 0;
const affixes_1 = require("./affixes");
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
exports.items = {
    weapons: {
        dagger: {
            base: "Dagger",
            prefix: affixes_1.affixes.prefixes.weapon.rusty.prefix,
            suffix: "",
            damage: 1 + affixes_1.affixes.prefixes.weapon.rusty.mod,
        },
    },
    armor: {
        robes: {
            base: "Robes",
            prefix: "",
            suffix: affixes_1.affixes.suffixes.armor.initiate.suffix,
            ac: 1,
        },
    },
};
