import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setMessage('');
        } else {
            setIsAuthenticated(false);
            setMessage('Debes iniciar sesión para ver el contenido.');
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se verifica la autenticación
    }

    if (!isAuthenticated) {
        return <div className="alert alert-warning">{message}</div>; // Muestra el mensaje de advertencia si no está autenticado
    }

    return <>{children}</>; // Renderiza los hijos si está autenticado
};

export default AuthGuard;
