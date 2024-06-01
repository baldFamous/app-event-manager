import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import EventPreview from '../../components/event_comp/EventPreview/EventPreview';
import EventFilters from '../../components/event_comp/EventFilters/EventFilters';
import { fetchEvents } from '../../api/eventService';
import './EventPage.css';
import SloganSection from "../../components/Slogan/SloganSection";
import AuthGuard from '../../components/authGuard/AuthGuard';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadEvents = async (location) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        try {
            const data = await fetchEvents(location);
            setEvents(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error fetching events:", error);
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadEvents(location);
    }, [location]);

    const handleFilterSubmit = (location) => {
        setLocation(location);
        loadEvents(location);
    };

    const handleEventClick = (id) => {
        navigate(`/events/${id}`);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <NavBar />
            <SloganSection />
            <div className="filter-section">
                <EventFilters onFilterSubmit={handleFilterSubmit} />
            </div>
            <div className="events-list">
                <h2>Todos los Eventos</h2>
                {!isAuthenticated ? (
                    <div className="alert alert-warning">Debes iniciar sesión para ver el contenido.</div>
                ) : (
                    <div className="events-grid">
                        {events.map(event => (
                            <EventPreview
                                key={event.id}
                                title={event.name}
                                description={event.description}
                                onClick={() => handleEventClick(event.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventsPage;