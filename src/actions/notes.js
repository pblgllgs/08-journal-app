import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };
        const doc = await addDoc(
            collection(db, `${uid}/journal/notes`),
            newNote
        );

        dispatch(activeNote(doc.id, newNote));
        dispatch(startLoadingNotes(uid));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    },
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes,
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        try {
            const update = doc(db, `${uid}/journal/notes/${note.id}`);
            await updateDoc(update, noteToFirestore);
            dispatch(refreshNote(note.id, noteToFirestore));
            Swal.fire('Guardado', note.body, 'success');
        } catch (error) {
            Swal.fire('Error', console.log(error), 'error');
        }
    };
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note,
        },
    },
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        const fileUrl = await fileUpload(file);
        console.log(fileUrl);
    };
};
