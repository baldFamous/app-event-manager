import React, { useState } from 'react';
import './EventFilters.css';

function EventFilters() {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    const handleLocationChange = (e) => setLocation(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Filtrando eventos en ${location} en la fecha ${date}`);
        // Aquí podrías disparar una acción para filtrar los eventos
    };

    return (
        <form className="event-filters" onSubmit={handleSubmit}>
            <input type="text" value={location} onChange={handleLocationChange} placeholder="Localidad" />
            <input type="date" value={date} onChange={handleDateChange} />
            <button type="submit">Filtrar</button>
        </form>
    );
}

export default EventFilters;