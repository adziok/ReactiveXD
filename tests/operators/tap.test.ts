import { Observable, tap } from './../../src';

describe('Test operator "map" on string type', () => {
    const observable = new Observable('TapTest');

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    const tapTest = jest.fn();

    observable
        .pipe(
            tap((v: any) => tapTest('taptest'))
        )
        .subscribe(
            next,
            error,
            finish,
        );

    it('Next function should return "TapTest" string', () => {
        expect(next).toHaveBeenLastCalledWith('TapTest');
    });

    it('tapTest function should return "taptest" string', () => {
        expect(tapTest).toHaveBeenLastCalledWith('taptest');
    });

    it('Error function should not be called', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Finish function should be called once', () => {
        expect(finish).toBeCalled();
    });
});
