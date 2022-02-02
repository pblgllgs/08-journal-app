import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCHNU7JjZyj7ppRJjVp9I_FAYZB0JibCkU',
    authDomain: 'journal-app-2b360.firebaseapp.com',
    projectId: 'journal-app-2b360',
    storageBucket: 'journal-app-2b360.appspot.com',
    messagingSenderId: '1060476625001',
    appId: '1:1060476625001:web:b1f4260476f62fa57e42f8',
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
