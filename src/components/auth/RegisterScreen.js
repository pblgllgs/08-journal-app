import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';

export const RegisterScreen = () => {
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
            console.log('form success');
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log('name is required');
            return false;
        } else if (!validator.isEmail(email)) {
            console.log('email is required');
            return false;
        }else if(password !== password2 || password.length < 5){
            console.log('Password shoud be at least 6 caracters and mach each other');
            return false;
        }

        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                <div className="auth__alert-error">Error</div>
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
