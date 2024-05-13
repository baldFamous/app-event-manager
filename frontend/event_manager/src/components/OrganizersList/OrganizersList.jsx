import React, { useState } from 'react';
import OrganizerPreview from '../OrganizerPreview/OrganizerPreview';
import OrganizerDetail from '../OrganizerDetail/OrganizerDetail';
import './OrganizersList.css';

function OrganizersList() {
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);

    const organizers = [
        { id: 1, name: 'Organizador 1', eventCount: 3, reservationCount: 150, description: "Descripción del Organizador 1", imageUrl: "url_to_image", events: [{ id: 101, name: "Evento 1" }] },
        // Más organizadores con estructura similar
    ];

    const handleOrganizerClick = (organizer) => {
        setSelectedOrganizer(organizer);
    };

    const handleClose = () => {
        setSelectedOrganizer(null);
    };

    return (
        <div>
            {organizers.map(org => (
                <OrganizerPreview key={org.id} organizer={org} onClick={() => handleOrganizerClick(org)} />
            ))}
            {selectedOrganizer && <OrganizerDetail organizer={selectedOrganizer} onClose={handleClose} />}
        </div>
    );
}

export default OrganizersList;