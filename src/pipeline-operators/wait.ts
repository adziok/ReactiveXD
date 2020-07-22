import { sleep } from '../utils/sleep.util';

export function wait(time: number) {
    return async (v: any) => {
        await sleep(time);

        return v;
    };
}
