import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from './authService';

const API_BASE_URL = 'http://127.0.0.1:8000/';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            fetchUserById(userId).then(userDetails => setUser(userDetails)).catch(() => logout());
        }
    }, []);

    const login = async (username, password) => {
        try {
            const data = await apiLogin(username, password);
            localStorage.setItem('token', data.access);
            localStorage.setItem('userId', data.user.id); // Asegúrate de que 'data.user.id' existe en la respuesta
            const userDetails = await fetchUserById(data.user.id);
            setUser(userDetails);
            return userDetails;
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

    const fetchUserById = async (id) => {
        if (!id) {
            throw new Error("No user ID provided");
        }
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }

        try {
            const response = await fetch(`${API_BASE_URL}accounts/user/${id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching user details:", error);
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
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, fetchUserById, updateUsername, updatePassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
