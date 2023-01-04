import { prism } from "./prism";
import { ForegroundOptions } from "./prism";

export const drocsay = (message: string, color?: keyof ForegroundOptions) => {
    let output = prism("\n-[ ", "cyan");
    output += prism(message, color ?? "white");
    return output;
}
