import { types } from '../../types/types';
import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';

describe('pruebas en ui', () => {
    test('la constante setError debe funcionar', () => {
        const action = {
            type: types.uiSetError,
            payload: 'Error!!',
        };

        const msg = setError('Error!!');

        expect(msg).toEqual(action);
    });

    test('la constante removeError debe funcionar', () => {
        const action = {
            type: types.uiRemoveError,
        };

        const msg = removeError();

        expect(msg).toEqual(action);
    });

    test('la constante startLoading debe funcionar', () => {
        const action = {
            type: types.uiStartLoading
        };

        const msg = startLoading();

        expect(msg).toEqual(action);
    });

    test('la constante finishLoading debe funcionar', () => {
        const action = {
            type: types.uiFinishLoading
        };

        const msg = finishLoading();

        expect(msg).toEqual(action);
    });
});
