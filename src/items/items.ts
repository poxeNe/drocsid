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
}

export type NormalType = keyof Items['bases']['normal'];

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
}
