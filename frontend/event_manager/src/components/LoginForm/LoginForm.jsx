import React, { useState } from 'react';
import './LoginForm.css';
import { login } from '../../api/authService.js';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onToggleForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            console.log('Logged in successfully', data);
            navigate('/')
        } catch (error) {
            console.error('Login error:', error);
            // Handle login errors, e.g., show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Iniciar Sesión</h2>
            <div className="input-group">
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="actions">
                <button type="submit">Iniciar Sesión</button>
            </div>
        </form>
    );
}

export default LoginForm;