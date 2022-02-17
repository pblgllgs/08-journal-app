import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// const firebaseConfigTesting = {
//     apiKey: 'AIzaSyDSFXG4SLFINILX9Ls-ajCepvYGe6q5BdY',
//     authDomain: 'journal-test-461ca.firebaseapp.com',
//     projectId: 'journal-test-461ca',
//     storageBucket: 'journal-test-461ca.appspot.com',
//     messagingSenderId: '1036753957074',
//     appId: '1:1036753957074:web:999af218ad96e302b0bd0b',
// };

// if(process.env.NODE_ENV === 'test'){
//     const app = initializeApp(firebaseConfigTesting);
// }else{
//     const app = initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);

// Initialize Firebase
// eslint-disable-next-line no-unused-vars

const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
