import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from './authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails(token).then(userDetails => setUser(userDetails)).catch(() => logout());
        }
    }, []);

    const login = async (username, password) => {
        try {
            const data = await apiLogin(username, password);
            setUser(data.user); // Asume que la respuesta del login incluye detalles del usuario
            localStorage.setItem('token', data.access);
        } catch (error) {
            console.error("Failed to login:", error);
            throw error;
        }
    };

    const register = async (username, password, email, role) => {
        try {
            const data = await apiRegister(username, password, email, role);
            return data;
        } catch (error) {
            console.error("Failed to register:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const fetchUserDetails = async (token) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/accounts/user/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch user details:", error);
        throw error;
    }
};