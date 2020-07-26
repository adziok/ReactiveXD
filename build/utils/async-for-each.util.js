"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncForEach = async (elements, callback) => {
    for (let i = 0, l = elements.length; i !== l; ++i) {
        await callback.call(this, elements[i], i, elements);
    }
};
