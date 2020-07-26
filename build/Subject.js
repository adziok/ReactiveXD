"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("./Observable");
class Subject {
    constructor(...args) {
        this.pending = false;
        this.observables = [];
        this.pending = true;
        this.dataStream = [...args];
    }
    next(v) {
        if (!this.pending) {
            throw new Error('Subject completed');
        }
        this.observables.forEach(({ next }) => (typeof next === 'function' && next(v)));
    }
    complete() {
        if (!this.pending) {
            throw new Error('Already complete');
        }
        this.pending = false;
        this.observables.forEach(({ close }) => (typeof close === 'function' && close()));
    }
    asObservable() {
        const { observable, close, next } = Observable_1.Observable.create(this.dataStream);
        this.observables.push({ close, next });
        return observable;
    }
}
exports.Subject = Subject;
