import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading, msgError } = useSelector((state) => state.ui);

    //valor inicial
    const initialForm = {
        email: '',
        password: '',
    };
    //iniciamos el custom hook
    const [formValues, handleInputchange] = useForm(initialForm);

    //desestructuramos los valores de formValues
    const { email, password } = formValues;

    //metodo para el login
    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            const msg = 'email is not valid';
            dispatch(setError(msg));
            return false;
        } else if (password.length < 6) {
            const msg = 'Password shoud be at least 6 caracters';
            dispatch(setError(msg));
            return false;
        }
        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >
                {msgError !== null && (
                    <div className="auth__alert-error">{msgError}</div>
                )}
                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputchange}
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputchange}
                />
                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={loading}
                >
                    Login
                </button>
                <div className="auth__social-networks">
                    <p>Login with social network</p>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button"
                            />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link" to="/auth/register">
                    Create a new account
                </Link>
            </form>
        </>
    );
};
