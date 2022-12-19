import { lib } from "../util/lib";

export const mkAttackRoll = async () => {
    const attackRoll = lib.random.int(1, 100);

    return attackRoll >= 51; // OR if (attackRoll >= 51) { return true; } else { return false; };
}
