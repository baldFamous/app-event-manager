import React, { useState } from 'react';
import './EventFilters.css';

function EventFilters({ onFilterSubmit }) {
    const [location, setLocation] = useState('');

    const handleLocationChange = (e) => setLocation(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterSubmit(location);
    };

    return (
        <form className="event-filters" onSubmit={handleSubmit}>
            <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Localidad"
            />
            <button type="submit">Filtrar</button>
        </form>
    );
}

export default EventFilters;