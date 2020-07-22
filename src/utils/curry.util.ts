import { asyncForEach } from './async-for-each.util';

export const curry = (steps: [(...args: any) => Promise<any> | any | void] | any[], errorCb: any) => async (initVal: any) => {
    try {
        let acc = await initVal;
        // tslint:disable-next-line: prefer-for-of
        await asyncForEach(steps, async fn => {
            acc = await fn(acc);
        });

        return acc;
    } catch (e) {
        errorCb(new Error(e));
    }
};

const awaiter = async (v: any) => await v;
