"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tap(cb) {
    return (v) => {
        cb(v);
        return v;
    };
}
exports.tap = tap;
