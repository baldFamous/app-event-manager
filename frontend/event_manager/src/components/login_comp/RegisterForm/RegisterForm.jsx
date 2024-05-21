import React, { useState } from 'react';
import './RegisterForm.css';
import {useNavigate} from "react-router-dom";
import {register} from "../../../api/authService";

function RegisterForm({ onToggleForm }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await register(username, password, email, role);
            console.log('Registered successfully', data);
            navigate('/login')
        } catch (error){
            console.error('Register error:', error);
        }
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
                    <option value="Usuario">Usuario</option>
                    <option value="Organizador">Organizador</option>
                </select>
            </div>
            <button type="submit" className="submit-button">Registrarse</button>
        </form>
    );
}

export default RegisterForm;