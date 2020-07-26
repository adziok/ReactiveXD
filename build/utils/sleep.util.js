"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = (time) => new Promise(r => setTimeout(r, time));
