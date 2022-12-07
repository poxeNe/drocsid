"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
class Weapon {
    weaponType;
    rarity;
    prefix;
    suffix;
    constructor(weaponType, rarity) {
        this.weaponType = weaponType;
        this.rarity = rarity;
    }
}
exports.Weapon = Weapon;
const getWeapon = () => new Weapon("Dagger", "Uncommon");
getWeapon();
