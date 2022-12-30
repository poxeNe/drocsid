import { lib } from "../util/lib";
import {drocsay} from "../util/drocsay";

export const fleeAction = async () => {
    console.log(drocsay("Attempting to flee..."));

    await lib.misc.sleep(1500);

    if (lib.random.int(1, 3) === 3) {
        console.log(drocsay("You successfully flee from the enemy!", "green"));
        // await lib.misc.sleep(1500);
        return true;

    } else {
        console.log(drocsay("You tried to escape but couldn't get away!", "red"));
        // await lib.misc.sleep(1500);
        return false;
    }
}
