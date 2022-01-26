import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/auth/login">
                    <LoginScreen />
                </Route>
                <Route exact path="/auth/register">
                    <RegisterScreen />
                </Route>
                <Redirect to="/auth/login" />
            </Switch>
        </div>
    );
};
