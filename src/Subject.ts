import { Observable } from './Observable';

export class Subject<T> extends Observable<T> {
    constructor(...args: any[]) {
        super(...args);

        this.pending = true;
    }

    public next(v: T) {
        if (!this.pending) {
            throw new Error('Subject completed');
        }

        this.eventEmitter.emit('next', v);
    }

    public complete() {
        if (!this.pending) {
            throw new Error('Already complete');
        }

        this.pending = false;
        this.eventEmitter.emit('complete');
        this.eventEmitter.removeAllListeners();
    }
}
