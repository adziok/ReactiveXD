import { Subject } from './../src/Subject';

describe('Subject', () => {
    const subject = new Subject('TapTest');


    const next = jest.fn();
    const error = jest.fn();
    const finish = jest.fn();

    subject
        .asObservable()
        .subscribe(
            next,
            error,
            finish,
        );

    subject.next('Siema');

    subject.complete();

    it('Next function should return "Siema" string at last call', () => {
        expect(next).toHaveBeenLastCalledWith('Siema');
    });

    it('Error function should not be called', () => {
        expect(error).toHaveBeenCalledTimes(0);
    });

    it('Finish function should be called once', () => {
        expect(finish).toBeCalled();
    });
});
