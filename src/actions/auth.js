import { types } from '../types/types';
import Swal from 'sweetalert2';
import { googleAuthProvider } from '../firebase/firebase-config';
import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        const auth = getAuth();
        dispatch(startLoading());
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Bienvenido ${user.displayName}`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((err) => {
                console.log(err);
                dispatch(finishLoading());
                Swal.fire('Error', 'Error al iniciar sesión!', 'error');
            });
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name });
                dispatch(login(user.uid, user.displayName));
            })
            .catch((err) => {
                console.log(err);
                Swal.fire('Error', 'Error al iniciar sesión!', 'error');
            });
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
        });
    };
};

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName,
        },
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Sesión terminada`,
            showConfirmButton: false,
            timer: 2000,
        });
    };
};

export const logout = () => ({
    type: types.logout,
});
