import React from 'react';
import './EventPreview.css';

function EventPreview({ title, description, onClick }) {
    return (
        <div className="event-preview" onClick={onClick}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default EventPreview;