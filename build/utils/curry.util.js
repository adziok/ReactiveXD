"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_for_each_util_1 = require("./async-for-each.util");
exports.curry = (steps, errorCb) => async (initVal) => {
    try {
        let acc = await initVal;
        // tslint:disable-next-line: prefer-for-of
        await async_for_each_util_1.asyncForEach(steps, async (fn) => {
            acc = await fn(acc);
        });
        return acc;
    }
    catch (e) {
        errorCb(new Error(e));
    }
};
const awaiter = async (v) => await v;
