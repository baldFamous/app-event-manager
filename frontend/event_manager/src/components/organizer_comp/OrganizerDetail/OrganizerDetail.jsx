import React from 'react';
import './OrganizerDetail.css';

function OrganizerDetail({ organizer, onClose }) {
    if (!organizer) return null;

    return (
        <div className="organizer-detail-modal">
            <div className="organizer-detail-content">
                <button onClick={onClose} className="close-button">Cerrar</button>
                <img src={organizer.organizer.imageUrl} alt={organizer.organizer.username} className="organizer-image"/>
                <h2>{organizer.organizer.username}</h2>
                <p>{organizer.organizer.description}</p>
                <h3>Eventos:</h3>
                <ul>
                    {organizer.events.map(event => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OrganizerDetail;
