import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

//creamos un action, le pasamos un estado y comparamos

describe('Pruebas en <AuthReducer />', () => {
    test('debe de autenticar y colocar el name del usuario', () => {
        //creamos un action
        const action = {
            type: types.login,
            payload: {
                uid: '123123',
                displayName: 'pablo',
            },
        };

        const initialState = {};
        //con el action y un estado vemos el comportamiento del reducer
        const state = authReducer(initialState, action);

        //esperamos que se cambie el estado por defecto a logged true con un name
        expect(state).toEqual({
            uid: '123123',
            name: 'pablo',
        });
    });

    test('debe de cerrar session', () => {
        //creamos un action
        const initialState = {
            uid: '123123',
            name: 'pablo',
        };
        const action = {
            type: types.logout
        };

        //con el action y un estado vemos el comportamiento del reducer
        const state = authReducer(initialState, action);

        //esperamos que se cambie el estado por defecto a logged true con un name
        expect(state).toEqual({});
    });

    test('debe de devolver el state por defecto', () => {
        //creamos un action
        const initialState = {
            uid: '123123',
            name: 'pablo',
        };
        const action = {
            type: types.xxx,
        };

        //con el action y un estado vemos el comportamiento del reducer
        const state = authReducer(initialState, action);

        //esperamos que se cambie el estado por defecto a logged true con un name
        expect(state).toEqual({
            uid: '123123',
            name: 'pablo',
        });
    });
    
});
