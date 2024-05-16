import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import EventPreview from '../components/EventPreview/EventPreview';
import Footer from '../components/Footer/Footer';
import EventFilters from '../components/EventFilters/EventFilters';
import { fetchEvents } from '../api/eventService';
import './EventPage.css';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState('');

    const loadEvents = async (location) => {
        try {
            const data = await fetchEvents(location);
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        loadEvents(location);
    }, [location]);

    const handleFilterSubmit = (location) => {
        setLocation(location);
        loadEvents(location);
    };

    return (
        <div>
            <NavBar />
            <div className="filter-section">
                <EventFilters onFilterSubmit={handleFilterSubmit} />
            </div>
            <div className="events-list">
                <h2>Todos los Eventos</h2>
                <div className="events-grid">
                    {events.map(event => (
                        <EventPreview
                            key={event.id}
                            title={event.name}
                            description={event.description}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EventsPage;