"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableWithPipe_1 = require("./ObservableWithPipe");
const EvenEmmiter_1 = require("./EvenEmmiter");
const Observer_1 = require("./Observer");
class Observable {
    constructor(...args) {
        this.subscribed = false;
        this.eventEmitter = new EvenEmmiter_1.EventEmitter();
        this.pending = false;
        this._source = [...args];
        this.eventEmitter.once('subscribe', () => this.handleSubscribeEvent());
    }
    subscribe(next, error, complete) {
        return new Observer_1.Observer({ next, error, complete, eventEmitter: this.eventEmitter });
    }
    pipe(...pipelines) {
        return new ObservableWithPipe_1.ObservableWithPipes(this.eventEmitter, pipelines);
    }
    /**
     * Call when Observer start subscribing data source
     *
     * @private
     * @memberof Observable
     */
    handleSubscribeEvent() {
        this.subscribed = true;
        while (this._source.length > 0) {
            this.emitNextEvent(this._source.shift());
        }
    }
    emitNextEvent(nextEvent) {
        this.eventEmitter.emit(nextEvent instanceof Error && 'error' || 'next', nextEvent);
        if (!this.pending && this._source.length === 0) {
            this.eventEmitter.emit('complete');
        }
    }
    /**
     * @internal
     *
     * Internal method to close Observable fromSubject
     * Method emit complete event and remove EventEmiiter listners
     *
     * @private
     * @returns
     * @memberof Observable
     */
    close() {
        return () => {
            this.pending = false;
            this.eventEmitter.emit('complete');
            this.eventEmitter.removeAllListeners();
        };
    }
    /**
     * @internal
     *
     * Internal method to commuinicate Subject with subscribe and allow to emit new data for observers
     * If subscribed is false pushing data to array of events
     * Else emit data by EventEmmiter
     *
     * @private
     * @memberof Observable
     */
    pushEvent() {
        return (val) => {
            this.eventEmitter.emit('next', val);
        };
    }
    /**
     * @internal
     *
     * Static method to create Observable with open method to allow ingerent of Observable existing
     * next metohod allow to push next values
     * close method allow to close observable and stop emmiting data
     *
     * @static
     * @template T
     * @param {SuperArray<T>} dataSource
     * @returns
     * @memberof Observable
     */
    static create(dataSource) {
        const observable = new Observable(...dataSource);
        observable.pending = true;
        return {
            next: observable.pushEvent(),
            close: observable.close(),
            observable
        };
    }
}
exports.Observable = Observable;
