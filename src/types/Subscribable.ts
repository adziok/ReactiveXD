import { Unsubscribable } from './Unsubscribable';

export interface Subscribable<T> {
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
}
