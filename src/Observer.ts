import { EventEmitter } from './EvenEmmiter';
import { PipelineOperator } from './types/PipelinesOperators';
import { Unsubscribable } from './types/Unsubscribable';
import { curry } from './utils/curry.util';

export class Observer<T> implements Unsubscribable {
    pipelines: PipelineOperator<T>[];

    constructor(
        // tslint:disable-next-line: no-empty
        { next = (...args) => {}, error = (...args) => {}, complete = () => {}, eventEmitter, pipelines = [] }: ObserverConstructorParams<T>
    ) {
        this.pipelines = pipelines;

        eventEmitter.on('next', (data) => curry([...this.pipelines, next], error)(data));

        eventEmitter.on('error', err => error(err));

        eventEmitter.on('complete', complete);

        eventEmitter.emit('subscribe');
    }

    unsubscribe() {
        // remove sub loginc
    }
}

interface ObserverConstructorParams<T> {
    next?: (arg: any) => void;
    error?: (arg: any) => void;
    complete?: () => void;
    eventEmitter: EventEmitter<'next' | 'error' | 'complete'>;
    pipelines?: PipelineOperator<T>[];
}
