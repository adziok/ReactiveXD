import { Observable } from './Observable';
import { Observer } from './Observer';

export class Subject<T> {
    private observers: Observer<T>[] = [];
    private closed = false;
    private stopped = false;
    private errored = false;

    constructor() {

    }

    next(...data: T[]): void {
        
    }

    asObservable(): Observable<T> {
        return new Observable({  });
    }
}