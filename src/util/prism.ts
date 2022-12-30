
type StyleOptions = {
    reset: string,
    bright: string,
    dim: string,
    underscore: string,
    blink: string,
    reverse: string,
    hidden: string,
};

export type ForegroundOptions = {
    white: string
    black: string,
    red: string,
    green: string,
    yellow: string,
    blue: string,
    magenta: string,
    cyan: string,
    grey: string,
    crimson: string,
};

type BackgroundOptions = {
    black: string,
    red: string,
    green: string,
    yellow: string,
    blue: string,
    magenta: string,
    cyan: string,
    white: string,
    crimson: string,
};

export const prism = (message: string, fgColor: keyof ForegroundOptions, styleType?: keyof StyleOptions, bgColor?: keyof BackgroundOptions) => {
    let output = "";

    const style = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
    };

    const fg = {
        white: "",
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        grey: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    };

    const bg = {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    };

    if (fgColor && styleType && bgColor) {
        output += fg[fgColor] + bg[bgColor] + style[styleType] + message + style.reset;
    } else if (bgColor && styleType) {
        output += bg[bgColor] + style[styleType] + message + style.reset;
    } else if (fgColor && styleType) {
        output += fg[fgColor] + style[styleType] + message + style.reset;
    } else if (fgColor && bgColor) {
        output += fg[fgColor] + bg[bgColor] + message + style.reset;
    } else if (bgColor) {
        output += bg[bgColor] + message + style.reset;
    } else if (styleType) {
        output += style[styleType] + message;
    } else {
        output += fg[fgColor] + message + style.reset;
    }

    return output;
}
