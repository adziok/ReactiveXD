import { Observable } from '../Observable';

export type PipelineOperator<T> = (...args: T[]) => Observable<any> | Promise<Observable<any>>;
