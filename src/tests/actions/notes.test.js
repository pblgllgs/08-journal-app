import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startNewNotes } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: 'test123',
    },
});

describe('pruebas en notes/actions', () => {
    test('debe de crear una nueva nota con startNewNote', async () => {
        await store.dispatch(startNewNotes());

        const payload = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
        };

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: payload,
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: payload,
        });  

        const docId = actions[0].payload.id;

        await deleteDoc(doc(db,`test123/journal/notes`, `${docId}`));
    });
});
