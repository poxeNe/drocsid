
export class Weapon {
    weaponType: string
    rarity: string
    prefix: string
    suffix: string

    constructor(weaponType: string, rarity: string) {
        this.weaponType = weaponType
        this.rarity = rarity
    }
}

const getWeapon = () => new Weapon("Dagger", "Uncommon")

getWeapon();