import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from './authService';

const API_BASE_URL = 'http://127.0.0.1:8000/';

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
            setUser(data.user);
            localStorage.setItem('token', data.access);
        } catch (error) {
            console.error("Failed to login:", error);
            throw error;
        }
    };

    const register = async (username, password, email, role) => {
        try {
            const data = await apiRegister(username, password, email, role);
            // Opcional: Puedes actualizar el estado del usuario aquí si es necesario
            // setUser(data.user);
            return data;
        } catch (error) {
            console.error("Failed to register:", error);
            throw error;
        }
    };

    const updateUsername = async (newUsername) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }

        try {
            const response = await fetch(`${API_BASE_URL}accounts/user/update/username/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUsername })
            });
            if (!response.ok) {
                throw new Error('Failed to update username');
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error updating username:", error);
            throw error;
        }
    };

    const updatePassword = async (oldPassword, newPassword) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }

        try {
            const response = await fetch(`${API_BASE_URL}accounts/user/update/password/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
            });
            if (!response.ok) {
                throw new Error('Failed to update password');
            }
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, updateUsername, updatePassword, logout }}>
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
