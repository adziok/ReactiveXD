import { PipelineOperator } from './PipelinesOperators';
import { EventEmitter } from '../EvenEmmiter';

export interface ObserverCtor<T> {
    next?: (arg: any) => void;
    error?: (arg: any) => void;
    complete?: () => void;
    eventEmitter: EventEmitter<'next' | 'error' | 'complete'>;
    pipelines?: PipelineOperator<T>[];
}
