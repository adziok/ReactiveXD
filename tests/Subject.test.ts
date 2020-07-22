import { Subject } from './../src/Subject';
import { tap } from '../src';

describe('Subject', () => {
    const observable = new Subject('TapTest');

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    const tapTest = jest.fn();

    observable
        .pipe(
            tap(console.log)
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
