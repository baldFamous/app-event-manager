import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import SloganSection from '../../components/Slogan/SloganSection';
import EventPreview from '../../components/event_comp/EventPreview/EventPreview';
import { fetchRecentEvents } from '../../api/eventService';
import './HomePage.css';
import AuthGuard from "../../components/authGuard/AuthGuard";

function HomePage() {
    const [events, setEvents] = useState([]); // Estado para almacenar los eventos
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentEvents = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/events/event/recent/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error fetching recent events:', error);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        fetchRecentEvents();
    }, []);

    const handleEventClick = (id) => {
        console.log('Clicked id:', id);
        navigate(`/events/${id}`);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <NavBar />
            <SloganSection />
            <br />
            <div className="recent-events">
                <h2>Eventos Recientes</h2>
                {!isAuthenticated ? (
                    <div className="alert alert-warning">Debes iniciar sesión para ver el contenido.</div>
                ) : (
                    <div className="events-grid">
                        {events.map(event => (
                            <EventPreview
                                key={event.id}
                                title={event.event_name}
                                description={event.description}
                                location={event.location}
                                onClick={() => handleEventClick(event.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;