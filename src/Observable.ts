import { ObservableWithPipes } from './ObservableWithPipe';
import { EventEmitter } from './EvenEmmiter';
import { Subscribable } from './types/Subscribable';
import { Unsubscribable } from './types/Unsubscribable';
import { Observer } from './Observer';
import { PipelineOperator } from './types/PipelinesOperators';

export class Observable<T> implements Subscribable<T> {
    private eventEmitter = new EventEmitter<'next' | 'error' | 'complete' | 'subscribe'>();
    private nextData: T[];
    private subscribed = false;
    private pending = false;

    constructor(...args: any[]) {
        this.nextData = args;

        this.eventEmitter.on('subscribe', () => {
            this.subscribed = true;
            this.nextData.forEach(v => this.eventEmitter.emit(v instanceof Error && 'error' || 'next', v));

            this.eventEmitter.emit('complete');
        });
    }

    public subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable {
        return new Observer({ next, error, complete, eventEmitter: this.eventEmitter });
    }

    public pipe(...pipelines: PipelineOperator<T>[]): Subscribable<T> {
        return new ObservableWithPipes(this.eventEmitter, pipelines);
    }
}
