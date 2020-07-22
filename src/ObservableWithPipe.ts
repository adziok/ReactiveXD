import { EventEmitter } from './EvenEmmiter';
import { Subscribable } from './types/Subscribable';
import { Unsubscribable } from './types/Unsubscribable';
import { Observer } from './Observer';
import { PipelineOperator } from './types/PipelinesOperators';

export class ObservableWithPipes<T> implements Subscribable<T> {
    constructor(
        private eventEmitter: EventEmitter<'next' | 'error' | 'complete' | 'subscribe'>,
        private pipelines?: PipelineOperator<T>[],
    ) { }

    public subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable {
        return new Observer({ next, error, complete, eventEmitter: this.eventEmitter, pipelines: this.pipelines });
    }
}
