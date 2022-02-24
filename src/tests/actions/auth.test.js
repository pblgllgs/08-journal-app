import thunk from 'redux-thunk';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import {
    login,
    logout,
    startLoginEmailPassword,
    startLogout,
} from '../../actions/auth';
import { ActionCodeOperation } from 'firebase/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas en auth/actions', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('login debe de crear la accion respectiva', () => {
        store.dispatch(login('28jgTFniAeTMYs7ENdLs', 'pablo'));

        const dataLogin = {
            type: types.login,
            payload: {
                uid: '28jgTFniAeTMYs7ENdLs',
                displayName: 'pablo',
            },
        };

        const actions = store.getActions();
        expect(actions[0]).toEqual(dataLogin);
    });

    test('debe de crear la accion respectiva de logout', () => {
        store.dispatch(logout());
        const dataLogout = {
            type: types.logout,
        };

        const actions = store.getActions();
        expect(actions[0]).toEqual(dataLogout);
    });

    test('debe de realizar el startLogout', async () => {
        await store.dispatch(startLogout());

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.logout,
        });
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning,
        });
    });

    test('debe de iniciar el startLoginEmailPassword', async () => {
        const email = 'pbl.gllgs@email.com';
        const password = '123123';

        await store.dispatch(startLoginEmailPassword(email, password));

        const actions = store.getActions();

        console.log(actions)

        expect(actions[0]).toEqual({
            type: types.uiStartLoading,
        });

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'p5z8LgJuShZNz0Xm5pwbNgdst7n1',
                displayName: null
            },
        });

        expect(actions[2]).toEqual({
            type: types.uiFinishLoading
        })
    });

    
});
