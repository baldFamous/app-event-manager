import React from 'react';
import './OrganizerDetail.css';

function OrganizerDetail({ organizer, onClose }) {
    if (!organizer) return null; // No renderizar si no hay datos de organizador

    const { name, description, imageUrl, events } = organizer;

    return (
        <div className="organizer-detail-modal">
            <div className="organizer-detail-content">
                <button onClick={onClose}>Cerrar</button>
                <img src={imageUrl} alt={`Imagen de ${name}`} />
                <h2>{name}</h2>
                <p>{description}</p>
                <h3>Eventos:</h3>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OrganizerDetail;