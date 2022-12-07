"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEW_PLAYER = void 0;
const mkNewCharacter_1 = require("./mkNewCharacter");
const actions_1 = require("./actions");
exports.NEW_PLAYER = true;
const main = async () => {
    const player = await (0, mkNewCharacter_1.mkNewCharacter)();
    await (0, actions_1.actions)(player);
    main();
};
main();
