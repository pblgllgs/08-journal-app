import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Sidebar } from '../../../components/journal/Sidebar';
import { Provider } from 'react-redux';

import { startLogout } from '../../../actions/auth';
import { startNewNotes } from '../../../actions/notes';
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
        active: null,
        notes:[]
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
            <Sidebar />
    </Provider>
);

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNotes: jest.fn(),
}));

describe('pruebas en <Sidebar />', () => {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de llamar la accion startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNotes).toHaveBeenCalled();
    });
});
