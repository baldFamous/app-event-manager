import React, { useState, useEffect } from 'react';
import OrganizerPreview from '../OrganizerPreview/OrganizerPreview';
import OrganizerDetail from '../OrganizerDetail/OrganizerDetail';
import { fetchOrganizers } from '../../../api/eventService';
import './OrganizersList.css';

function OrganizersList() {
    const [organizers, setOrganizers] = useState([]);
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);

    useEffect(() => {
        const loadOrganizers = async () => {
            try {
                const data = await fetchOrganizers();
                setOrganizers(data);
            } catch (error) {
                console.error("Error fetching organizers:", error);
            }
        };

        loadOrganizers();
    }, []);

    const handleOrganizerClick = (organizer) => {
        setSelectedOrganizer(organizer);
    };

    const handleClose = () => {
        setSelectedOrganizer(null);
    };

    return (
        <div>
            {organizers.map(org => (
                <OrganizerPreview key={org.organizer.id} organizer={org.organizer} onClick={() => handleOrganizerClick(org)} />
            ))}
            {selectedOrganizer && <OrganizerDetail organizer={selectedOrganizer} onClose={handleClose} />}
        </div>
    );
}

export default OrganizersList;