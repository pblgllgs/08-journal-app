import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { login } from '../../actions/auth';
import { AppRouter } from '../../Routers/AppRouter';
import { act } from '@testing-library/react';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: [],
    },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('pruebas en <AppRouter />', () => {
    test('debe de llamar al login si estoy autenticado', async () => {
        let user;
        await act(async () => {
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(
                auth,
                'pbl.gllgs@email.com',
                '123123'
            );
            user = userCred.user;
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });
        expect(login).toHaveBeenCalledWith('p5z8LgJuShZNz0Xm5pwbNgdst7n1',null);
    });
});
