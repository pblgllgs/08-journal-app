import { types } from '../../types/types';

describe('Pruebas en types.js', () => {
    const objeto = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',

        uiSetError: '[UI] set error',
        uiRemoveError: '[UI] remove error',

        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',

        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated note',
        notesFilesUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning',
    };

    test('debe ser igual a es objeto', () => {
        expect(types).toEqual(objeto);
    });
});
