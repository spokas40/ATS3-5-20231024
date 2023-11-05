import React from 'react';
import LoginContainer from './Login-container.js';
import '../styles/styles.css';

const Login = ({ onStartGame}) => {
    console.log('Login component is being rendered');
    return (
        <div className="login">
            <LoginContainer onStartGame={onStartGame} />
        </div>
    );
};

export default Login;