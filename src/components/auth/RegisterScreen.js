import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector((state) => state.ui);

    //valor inicial
    const initialForm = {
        name: 'Pablo',
        email: 'pablo@gmail.com',
        password: '123456',
        password2: '123456',
    };
    //iniciamos el custom hook
    const [formValues, handleInputchange] = useForm(initialForm);

    //desestructuramos los valores de formValues
    const { name, email, password, password2 } = formValues;

    //metodo para el login
    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password,name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            const msg = 'name is required';
            dispatch(setError(msg));
            return false;
        } else if (!validator.isEmail(email)) {
            const msg = 'email is not valid';
            dispatch(setError(msg));
            return false;
        } else if (password !== password2 || password.length < 5) {
            const msg =
                'Password shoud be at least 6 caracters and mach each other';
            dispatch(setError(msg));
            return false;
        }
        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {msgError !== null && (
                    <div className="auth__alert-error">{msgError}</div>
                )}
                <input
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputchange}
                />
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
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputchange}
                />
                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>
                <Link className="link" to="/auth/login">
                    Already register?
                </Link>
            </form>
        </>
    );
};
