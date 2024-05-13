import React from 'react';
import EventPreview from '../EventPreview/EventPreview';
import './EventList.css';

function EventsList() {
    // Aquí eventualmente tendrías una llamada a la API para obtener eventos
    const events = [
        { title: 'Evento 1', description: 'Descripción del Evento 1' },
        { title: 'Evento 2', description: 'Descripción del Evento 2' },
        // Añade más eventos de prueba según necesario
    ];

    return (
        <div>
            {events.map((event, index) => (
                <EventPreview key={index} title={event.title} description={event.description} />
            ))}
        </div>
    );
}

export default EventsList;