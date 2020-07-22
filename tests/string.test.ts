import { sleep } from './../src/utils/sleep.util';
import { Observable } from './../src/types/Observable';
import { tap, map, wait } from '../src/pipeline-operators/tap';

describe('Obseravble from string', () => {
    const observable = new Observable('Siemka');

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    observable
        .subscribe(
            next,
            error,
            finish,
        ),

    it('First parametr should return "Siemka"', () => {
        expect(next).toHaveBeenLastCalledWith('Siemka');
    });

    it('Second parametr should return "null"', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Third parametr should be called', () => {
        expect(finish).toBeCalled();
    });
});

describe('Obseravble from Promise', () => {
    const observable = new Observable(Promise.resolve('Siemka'));

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    observable
        .subscribe(
            next,
            error,
            finish,
        ),

    it('First parametr should return "Siemka"', () => {
        expect(next).toHaveBeenLastCalledWith('Siemka');
    });

    it('Second parametr should return "null"', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Third parametr should be called', () => {
        expect(finish).toBeCalled();
    });
});

describe('Transform obseravble from string using "tapAdd" operator', () => {
    const observable = new Observable('Siemka');

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    observable
        .pipe(
            wait(1000),
            // tap(console.log),
            map(v => v + v),
        )
        .subscribe(
            next,
            error,
            finish,
        );

    it('First parametr should return "SiemkaSiemka"', async () => {
        await sleep(2100)
        expect(next).toHaveBeenLastCalledWith('SiemkaSiemka');
    });

    it('Second parametr should return "null"', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Third parametr should be called', async () => {
        // await sleep(2100)
        expect(finish).toBeCalled();
    });
});

describe('Throwing error in pipe when observable is valid', () => {
    const observable = new Observable('Siemka');

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    observable
        .pipe(
            map(v => new Error('Error')),
        )
        .subscribe(
            next,
            error,
            finish,
        );

    it('First parametr should return "null"', async () => {
        expect(next).toHaveBeenCalledTimes(0);
    });

    it('Second parametr should return "Error"', async () => {
        // await sleep(2100)
        expect(error).toBeCalled();
    });

    it('Third parametr should be called', async () => {
        // await sleep(2100)
        expect(finish).toBeCalled();
    });
});
