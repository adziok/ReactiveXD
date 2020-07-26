import { Observable } from './Observable';

/**
 * Interface defining function returned from Observable.create() method
 * next metohod allow to push next values
 * close method allow to close observable and stop emmiting data
 *
 * @interface ObservableFunctions
 * @template T
 */
interface ObservableFunctions<T> {
    next: (nextValue: T) => void;
    close: () => void;
}
export class Subject<T> {
    private dataStream: T[];
    private pending = false;
    private observables: ObservableFunctions<T>[] = [];

    constructor(...args: T[]) {
        this.pending = true;
        this.dataStream = [...args];
    }

    public next(v: T) {
        if (!this.pending) {
            throw new Error('Subject completed');
        }

        this.observables.forEach(({ next }) => (typeof next === 'function' && next(v)));
    }

    public complete() {
        if (!this.pending) {
            throw new Error('Already complete');
        }

        this.pending = false;
        this.observables.forEach(({ close }) => (typeof close === 'function' && close()));
    }

    public asObservable(): Observable<T> {
        const { observable, close, next } = Observable.create<T>(this.dataStream);

        this.observables.push({ close, next });

        return observable;
    }

}
