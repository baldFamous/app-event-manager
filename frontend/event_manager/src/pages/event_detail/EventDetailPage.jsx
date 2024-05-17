import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../../api/eventService';
import NavBar from "../../components/NavBar/NavBar";
import SloganSection from "../../components/Slogan/SloganSection";
import './EventDetailPage.css';

function EventDetailPage() {
    const { id } = useParams(); // Obtener el ID del evento desde los parámetros de la URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await fetchEventById(id);
                setEvent(data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        loadEvent();
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <SloganSection />
            <div className="event-detail-container">
                <div className="event-detail-header">
                    <h1>{event.event_name}</h1>
                    <p>Location: {event.location}</p>
                    <p>Date: {new Date(event.event_date).toLocaleString()}</p>
                    <p>{event.description}</p>
                </div>
            </div>
        </div>
    );
}

export default EventDetailPage;