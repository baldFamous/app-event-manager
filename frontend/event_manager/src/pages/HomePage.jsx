import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import EventPreview from '../components/EventPreview/EventPreview';
import Footer from '../components/Footer/Footer';
import SloganSection from "../components/Slogan/SloganSection";

function HomePage() {
    return (
        <div>
            <NavBar />
            <SloganSection />
            <br/>
            <div className="featured-events">
                <h2>Eventos Destacados</h2>
                <div className="events-grid">
                    <EventPreview title="Evento 1" description="Descripción del evento 1." />
                    <EventPreview title="Evento 2" description="Descripción del evento 2." />
                    <EventPreview title="Evento 3" description="Descripción del evento 3." />
                </div>
            </div>
            <br/>
            <div className="recent-events">
                <h2>Eventos Recientes</h2>
                <div className="events-grid">
                    <EventPreview title="Evento 4" description="Descripción del evento 4." />
                    <EventPreview title="Evento 5" description="Descripción del evento 5." />
                    <EventPreview title="Evento 6" description="Descripción del evento 6." />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;