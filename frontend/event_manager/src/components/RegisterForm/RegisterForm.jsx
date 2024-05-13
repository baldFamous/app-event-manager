import React, { useState } from 'react';
import './RegisterForm.css';

function RegisterForm({ onToggleForm }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register:', { username, email, password, role });
        // Aquí agregarías el código para interactuar con la API de autenticación
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="input-field"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="input-field"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input-field"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="role">Rol:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="input-field"
                    required
                >
                    <option value="">Selecciona un rol</option>
                    <option value="usuario">Usuario</option>
                    <option value="organizador">Organizador</option>
                </select>
            </div>
            <button type="submit" className="submit-button">Registrarse</button>
        </form>
    );
}

export default RegisterForm;