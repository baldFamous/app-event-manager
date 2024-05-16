import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import SloganSection from '../components/Slogan/SloganSection';
import EventPreview from '../components/EventPreview/EventPreview';
import Footer from '../components/Footer/Footer';
import { fetchRecentEvents } from '../api/eventService';
import './HomePage.css';

function HomePage() {
    const [events, setEvents] = useState([]); // Estado para almacenar los eventos

    useEffect(() => {
        fetchRecentEvents()
            .then(data => {
                setEvents(data); // Actualiza el estado con los eventos recibidos
            })
            .catch(error => {
                console.error("Error fetching recent events:", error);
            });
    }, []); // El arreglo vacío asegura que el efecto se ejecute solo una vez al montar el componente

    return (
        <div>
            <NavBar />
            <SloganSection />
            <br/>
            <div className="recent-events">
                <h2>Eventos Recientes</h2>
                <div className="events-grid">
                    {events.map(event => (
                        <EventPreview
                            key={event.id}
                            title={event.event_name}
                            description={event.description}
                            location = {event.location}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;