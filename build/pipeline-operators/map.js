"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function map(cb) {
    return (v) => {
        return cb(v);
    };
}
exports.map = map;
