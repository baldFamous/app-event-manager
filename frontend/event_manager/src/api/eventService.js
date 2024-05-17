const API_BASE_URL = 'http://127.0.0.1:8000/';

export const fetchRecentEvents = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}events/event/recent/`, { // Asegúrate de que el endpoint es correcto
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch events');
        }
        return data;
    } catch (error) {
        console.error("Error fetching recent events:", error);
        throw error;
    }
};

export const fetchEvents = async (location = '') => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found");
    }

    try {
        let url = `${API_BASE_URL}events/event/`;
        if (location) {
            url += `?location=${encodeURIComponent(location)}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch events');
        }
        return data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

export const fetchEventById = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found");
    }

    try {
        const response = await fetch(`${API_BASE_URL}events/event/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch event');
        }
        return data;
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error;
    }
};

export const fetchOrganizers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found");
    }

    try {
        const response = await fetch(`${API_BASE_URL}accounts/user/organizers/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch organizers');
        }
        return data;
    } catch (error) {
        console.error("Error fetching organizers:", error);
        throw error;
    }
};