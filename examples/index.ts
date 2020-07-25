// tslint:disable: max-classes-per-file
// import { Observable, Subject } from '../src';
import { EventEmitter } from 'events';

class Subscription {
    private isActive = false;

    constructor(props) {
        Object.entries(props).forEach(([key, val]) => this[key] = val);
        this.isActive = true;
    }

    public unsubscribe() {
        this.isActive = false;
    }
}

class Observable {
    private subs = [];

    constructor() { }

    public subscribe(observer) {
        const sub = new Subscription({ observer });
        this.subs.push(sub);
        return sub;
    }

    public next(...data) {
        const { subs } = this;

        for (const sub of subs) {
            if (sub.isActive) {
                sub.observer(data);
            }
        }
    }
}

class Subject {
    private observers = [];
    private emitter = new EventEmitter();
    private dataStream;
    private events = {};

    constructor() {
        this.dataStream = [];
    }

    public next(data: any) {
        // this.emit('next', data);
        this.dataStream.push(data);

        const { observers } = this;

        for (const observer of observers) {
            observer.next(data);
        }
    }

    public asObservable() {
        const obs = new Observable();
        this.observers.push(obs);
        return obs;
    }
}

class ReplaySubject {
    private observers = [];
    private emitter = new EventEmitter();
    private dataStream;
    private events = {};

    constructor() {
        this.dataStream = [];
    }

    public next(data: any) {
        // this.emit('next', data);
        this.dataStream.push(data);

        const { observers } = this;

        for (const observer of observers) {
            observer.next(data);
        }
    }

    public asObservable() {
        const obs = new Observable();
        this.observers.push(obs);
        return obs;
    }
}

/* Subject */

const subject = new Subject();
const observable = subject.asObservable();

const sub = observable.subscribe(x => console.log(x));

subject.next(1);
subject.next(2);
subject.next(3);

sub.unsubscribe();

subject.next(4);
subject.next(5);
subject.next(6);
/* ReplaySubject */

// const replaySubject = new ReplaySubject(1);
// const observable1 = subject.asObservable();

// subject.next(1);
// subject.next(2);
// subject.next(3);

// observable1.subscribe(x => console.log(x));
