/**
 * @jest-environment node
 */

import { types } from '../../types/types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {
    startLoadingNotes,
    startNewNotes,
    startSaveNote,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'test123',
    },
};

let store = mockStore(initState);

describe('pruebas en notes/actions', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

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

        await deleteDoc(doc(db, `/test123/journal/notes`, `${docId}`));
    });

    test('debe de cargar las notas startLoadingNotes', async () => {
        await store.dispatch(startLoadingNotes('test123'));
        const actions = store.getActions();
        console.log(actions[0].payload);

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array),
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('startSaveNote debe de guardar la nota', async () => {
        const note = {
            id: '28jgTFniAeTMYs7ENdLs',
            title: 'titulo 2',
            body: 'body 2',
        };

        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await getDoc(
            doc(db, `/test123/journal/notes/`, note.id)
        );
        expect(docRef.data().title).toBe(note.title);
    });
});
