import { EventEmitter } from './EvenEmmiter';
import { PipelineOperator } from './types/PipelinesOperators';
import { Unsubscribable } from './types/Unsubscribable';
import { curry } from './utils/curry.util';
import { ObserverCtor } from './types/ObserverCtor';

export class Observer<T> implements Unsubscribable {
    pipelines: PipelineOperator<T>[];
    eventEmitter: EventEmitter<'next' | 'error' | 'complete'>;

    private events: [string, (...args: any[]) => void][] = [];

    constructor(
        // tslint:disable-next-line: no-empty
        { next = (...args) => {}, error = (...args) => {}, complete = () => {}, eventEmitter, pipelines = [] }: ObserverCtor<T>
    ) {
        this.pipelines = pipelines;
        this.eventEmitter = eventEmitter;

        this.events.push(['next', (data: T) => curry([...this.pipelines, next], error)(data)]);
        this.events.push(['error', (err: any) => error(err)]);
        this.events.push(['complete', complete]);

        this.events.forEach(([evName, cb]) => this.eventEmitter.on(evName, cb));

        eventEmitter.emit('subscribe');
    }

    unsubscribe() {
        this.events.forEach(([evName, cb]) => this.eventEmitter.removeListener(evName, cb));
    }
}

// tslint:disable-next-line: max-classes-per-file
class ObserverExecutor<T> {


}