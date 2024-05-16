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