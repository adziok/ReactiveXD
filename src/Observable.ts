import { ObservableWithPipes } from './ObservableWithPipe';
import { EventEmitter } from './EvenEmmiter';
import { Subscribable } from './types/Subscribable';
import { Unsubscribable } from './types/Unsubscribable';
import { Observer } from './Observer';
import { PipelineOperator } from './types/PipelinesOperators';

export class Observable<T> implements Subscribable<T> {
    private dataStream: T[];
    private subscribed = false;
    protected eventEmitter = new EventEmitter<'next' | 'error' | 'complete' | 'subscribe'>();
    protected pending = false;

    constructor(...args: any[]) {
        this.dataStream = args;

        this.eventEmitter.on('subscribe', () => {
            this.subscribed = true;
            this.dataStream.forEach(nextEvent => this.eventEmitter.emit(nextEvent instanceof Error && 'error' || 'next', nextEvent));

            !this.pending && this.eventEmitter.emit('complete');
        });
    }

    public subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable {
        return new Observer({ next, error, complete, eventEmitter: this.eventEmitter });
    }

    public pipe(...pipelines: PipelineOperator<T>[]): Subscribable<T> {
        return new ObservableWithPipes(this.eventEmitter, pipelines);
    }

}
