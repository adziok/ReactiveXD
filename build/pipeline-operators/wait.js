"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_util_1 = require("../utils/sleep.util");
function wait(time) {
    return async (v) => {
        await sleep_util_1.sleep(time);
        return v;
    };
}
exports.wait = wait;
