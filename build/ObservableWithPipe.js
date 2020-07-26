"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observer_1 = require("./Observer");
class ObservableWithPipes {
    constructor(eventEmitter, pipelines) {
        this.eventEmitter = eventEmitter;
        this.pipelines = pipelines;
    }
    subscribe(next, error, complete) {
        return new Observer_1.Observer({ next, error, complete, eventEmitter: this.eventEmitter, pipelines: this.pipelines });
    }
}
exports.ObservableWithPipes = ObservableWithPipes;
