import { lib } from '../util/lib'
import { affixes } from "./affixes";

export type Items = {
    bases: {
        normal: {
            melee: string[]
            // ranged: string[]
            caster: string[]
        }
        elite: {}
    }
    drops: {
        forest: { [itemName: string]: GlobalItemProps }
        swamps: {}
        mountains: {}
    }
}

export type GlobalItemProps = {
    name: string
    equippable: boolean
    usable: boolean
}

// export type NormalType = keyof Items['bases']['normal'];

export const items: Items  = {
    bases: {
        normal: {
            melee: [
                "Dagger",
                "Hand Axe",
                "Javelin",
                "Shortsword",
                "Double Axe",
                "Spear",
                "Greatsword",
                "Great Axe",
                "Halberd",
            ],

            // ranged: [
            //     "Sling",
            //     "Shortbow",
            //     "Longbow",
            //     "Compound Bow",
            // ],

            caster: [
                "Wand",
                "Crosier",
                "Short Staff",
                "Long Staff",
                "Metal Staff",
                "War Staff",
            ],
        },
        elite: {},
    },

    drops: {
        forest: {
            mushrooms: {
                name: "Mushrooms",
                equippable: false,
                usable: true,
            },
            herbs: {
                name: "Herbs",
                equippable: false,
                usable: true,
            },
        },
        swamps: {},
        mountains: {},
    },
}
