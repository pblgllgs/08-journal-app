import thunk from 'redux-thunk';
import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import { login, logout } from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '28jgTFniAeTMYs7ENdLs',
        displayName: 'pablo',
    },
};

let store = mockStore(initState);

describe('Pruebas en auth/actions', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('login debe de crear la accion respectiva', () => {
        store.dispatch(login(initState.auth.uid,initState.auth.displayName));

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
});
