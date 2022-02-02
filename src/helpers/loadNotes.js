import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase/firebase-config'

export const loadNotes = async (uid) => {
    const querySnap = await getDocs(collection(db, `${uid}/journal/notes`));

    const notes = [];

    querySnap.forEach((doc) => {
        notes.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return notes;
};
