import { Observable } from './../src/Observable';
import { Subject } from '../src/Subject';
import { tap } from '../src';

const subject = new Subject('TapTest');

const a = setInterval(() => {
    subject.next('Test');
}, 200);

setTimeout(() => {
    clearInterval(a)
}, 2000);

subject
    .asObservable()
    .pipe(
        tap(console.log)
    )
    .subscribe();