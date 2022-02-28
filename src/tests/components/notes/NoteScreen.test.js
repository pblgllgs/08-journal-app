import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: 'p5z8LgJuShZNz0Xm5pwbNgdst7n1',
        name: 'test123',
    },
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo',
            date: 0
        },
        notes: [],
    },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
);

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));

describe('pruebas en <NoteScreen />', () => {
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar el activeNote con los respectivos argumentos', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target:{
                name:'title',
                value: 'Hola de nuevo'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            1234,
            {
                body:'mundo',
                title: 'Hola de nuevo',
                id: 1234,
                date: 0
            }
        );
    });
});
