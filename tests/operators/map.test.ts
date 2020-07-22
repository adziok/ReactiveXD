import { Observable, map } from './../../src';

describe('Test operator "map" on string type', () => {
    const observable = new Observable('MapTest');

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    observable
        .pipe(
            map((v: string) => v.repeat(2))
        )
        .subscribe(
            next,
            error,
            finish,
        ),

    it('Next function should return "MapTestMapTest" string', () => {
        expect(next).toHaveBeenLastCalledWith('MapTestMapTest');
    });

    it('Error function should not be called', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Finish function should be called once', () => {
        expect(finish).toBeCalled();
    });
});

describe('Test operator "map" on number type', () => {
    const observable = new Observable<number>(2);

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    observable
        .pipe(
            map((v: number) => v * 2)
        )
        .subscribe(
            next,
            error,
            finish,
        ),

    it('Next function should return 4', () => {
        expect(next).toHaveBeenLastCalledWith(4);
    });

    it('Error function should not be called', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Finish function should be called once', () => {
        expect(finish).toBeCalled();
    });
});

describe('Test operator "map" on Promise type', () => {
    const observable = new Observable(Promise.resolve(2));

    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    observable
        .pipe(
            map((v: number) => v * 2)
        )
        .subscribe(
            next,
            error,
            finish,
        ),

    it('Next function should return 4', () => {
        expect(next).toHaveBeenLastCalledWith(4);
    });

    it('Error function should not be called', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Finish function should be called once', () => {
        expect(finish).toBeCalled();
    });

});
