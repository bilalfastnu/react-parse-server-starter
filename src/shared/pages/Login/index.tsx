import * as React from 'react';
import LoginForm from '../../components/LoginForm';
import css from './login.module.css';

export default function Login() {
    return (
        <div className={css.wrapper}>
            <LoginForm />
        </div>
    );
}
