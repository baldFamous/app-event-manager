import React from 'react';
import './EventPreview.css';

function EventPreview({ title, description }) {
    return (
        <div className="event-preview">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default EventPreview;