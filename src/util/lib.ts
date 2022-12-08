// noinspection JSUnusedGlobalSymbols

export const lib = {

//--- RANDOM ---//
    random: {
    //--- return a random float inclusive of 0 but not inclusive of 1.
        float: () => Math.random(),
    //--- return a random int between the min/max range.
        int: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min),
    //--- return a random index of an array
        choice(array: any) {
            const randIndex: number = Math.floor(Math.random() * array.length)

            return array[randIndex];
        },
    //--- roll any amount of dice with any amount of sides, and return an array of the results.
        dice: (quantity: number, sides: number) => {
            const dice_pool = []

            for (let i = 0; i < Number(quantity); i++) {
                dice_pool.push(lib.random.int(1, sides))
            }

            return dice_pool;
        },
    },

//--- ARRAYS ---//
    array: {
    //--- return the sum of an array of integers.
        sum: (array: any) => array.reduce((partialSum: any, a: any) => partialSum + a, 0),
    //--- pass through array, and concatenate with commas in-between, returning a more readable string.
        commas: (array: any) => {
            let newString = ''
            let i = 0

            // [bob, joe, whatever]
            // bob, joe, whatever

            for (const length in array) {
                newString += array[i]
                i += 1

                if (i < array.length) {
                    newString += ', '
                }
            }

            return newString;
        }
    },

//--- MATH ---//
    math: {
    //--- round float to the desired decimal place.
        roundFloat: (float: any, place: any) => parseFloat(float).toFixed(place),
    //--- fdr (four-digit, rounded) float
    //--- pass through an int or float, return a 4-digit rounded float (2 digits to the left/right of the decimal).
        fdrFloat: (num: any) => {
            if (!Number.isInteger(num)) {
                //--- round passed float to the 4th dig to the right of decimal.
                const newNum = lib.math.roundFloat(num, 4)
                //--- convert new rounded num to a string.
                const numString = String(newNum)
                //--- convert that string to an array.
                const numArray = Array.from(numString)
                //--- splice off the "0." from the string.
                numArray.splice(0, 2)
                //--- splice in a period 2 indexes over into the array.
                numArray.splice(2, 0, '.')

                //--- concatenate the indexes together into a new string.
                return parseFloat(numArray.join(''))
            //--- OLD: this manually does what .join() does, basically.
                // for (let i = 0; i < numArray.length; i++) {
                //     newString += numArray[i]
                // }
            }

        //--- WIP: this shit doesn't work correctly for anything under 4 digits.
            if (Number.isInteger(num)) {
                let mod = 10
                for (let i = 0; i < String(num).length - 3; i++) {
                    mod *= 10
                }
                if (String(num).length === 2) {
                    return lib.math.roundFloat(num, 2)
                } else if (String(num).length === 1) {
                    if (num === 0) {
                        num = '00.00'
                        return num;
                    }
                    num = num * mod
                    return lib.math.roundFloat(num, 2)
                } else {
                    num = num / mod
                    return lib.math.roundFloat(num, 2)
                }

            }
        },
    },

//--- MISCELLANEOUS ---//
    misc: {
        sleep: (ms: number) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
    },

//--- FIXED VALUES ---//
    distances: {
        feet_mile: 5280,
        kilometer: 1000,
        feet_kilometer: Math.ceil((1000 * 39.37) / 12),
    },
};
