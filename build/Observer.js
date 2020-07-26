"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_util_1 = require("./utils/curry.util");
class Observer {
    constructor(
    // tslint:disable-next-line: no-empty
    { next = (...args) => { }, error = (...args) => { }, complete = () => { }, eventEmitter, pipelines = [] }) {
        this.events = [];
        this.pipelines = pipelines;
        this.eventEmitter = eventEmitter;
        this.events.push(['next', (data) => curry_util_1.curry([...this.pipelines, next], error)(data)]);
        this.events.push(['error', (err) => error(err)]);
        this.events.push(['complete', complete]);
        this.events.forEach(([evName, cb]) => this.eventEmitter.on(evName, cb));
        eventEmitter.emit('subscribe');
    }
    unsubscribe() {
        this.events.forEach(([evName, cb]) => this.eventEmitter.removeListener(evName, cb));
    }
}
exports.Observer = Observer;
// tslint:disable-next-line: max-classes-per-file
class ObserverExecutor {
}
