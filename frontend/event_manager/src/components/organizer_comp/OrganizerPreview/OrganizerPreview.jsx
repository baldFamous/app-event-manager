import React from 'react';
import './OrganizerPreview.css';

function OrganizerPreview({ organizer, onClick }) {
    const { username, eventCount, reservationCount } = organizer;

    return (
        <div className="organizer-preview" onClick={onClick}>
            <h3>{username}</h3>
            <p>Eventos: {eventCount}</p>
            <p>Reservaciones: {reservationCount}</p>
        </div>
    );
}

export default OrganizerPreview;
