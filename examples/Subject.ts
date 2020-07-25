import { Subject } from '../src/Subject';
import { tap } from '../src';

const subject = new Subject('TapTest');

setInterval(() => {
    subject.next('Test');
}, 200);

setTimeout(() => {
    subject.complete();
}, 2000);

subject
    .pipe(
        tap(console.log)
    )
    .subscribe();