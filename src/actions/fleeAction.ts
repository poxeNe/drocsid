import { lib } from "../util/lib";

export const fleeAction = async () => {
    console.log("\n-[ Attempting to flee...");
    await lib.misc.sleep(1500);

    if (lib.random.int(1, 3) === 3) {
        console.log("\n-[ You successfully flee from the enemy!");
        // await lib.misc.sleep(1500);
        return true;
    } else {
        console.log("\n-[ You tried to escape but couldn't get away!");
        // await lib.misc.sleep(1500);
        return false;
    }
}
