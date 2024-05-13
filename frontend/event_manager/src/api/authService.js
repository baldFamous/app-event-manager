const API_BASE_URL = 'http://127.0.0.1:8000/';

export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}accounts/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Failed to login');
    }
    localStorage.setItem('token', data.access);
    return data;
};

export const register = async (username, email, password, role) => {
    const response = await fetch(`${API_BASE_URL}users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Failed to register');
    }
    return data;
};