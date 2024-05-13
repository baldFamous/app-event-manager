import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import SloganSection from '../components/Slogan/SloganSection';
import EventFilters from '../components/EventFilters/EventFilters';
import EventsList from '../components/EventList/EventList';

function EventsPage() {
    return (
        <div>
            <NavBar />
            <SloganSection />
            <EventFilters />
            <EventsList />
        </div>
    );
}

export default EventsPage;