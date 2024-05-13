import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onToggleForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://your-backend-url/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.access);  // Assuming 'access' is the token
                console.log('Logged in successfully');
                // Redirect or perform further actions
            } else {
                throw new Error(data.detail || 'Unable to login');
            }
        } catch (error) {
            console.error('Login error:', error);
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