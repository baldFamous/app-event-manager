import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SloganSection from '../../components/Slogan/SloganSection';
import OrganizerPreview from '../../components/organizer_comp/OrganizerPreview/OrganizerPreview';
import OrganizerDetail from '../../components/organizer_comp/OrganizerDetail/OrganizerDetail';
import { fetchOrganizers } from '../../api/eventService';
import './OrganizersPage.css';
import AuthGuard from '../../components/authGuard/AuthGuard'; // Importa el componente AuthGuard

function OrganizersPage() {
    const [organizers, setOrganizers] = useState([]);
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrganizers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const data = await fetchOrganizers();
                setOrganizers(data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error fetching organizers:", error);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        loadOrganizers();
    }, []);

    const handleOrganizerClick = (organizer) => {
        setSelectedOrganizer(organizer);
    };

    const handleClose = () => {
        setSelectedOrganizer(null);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <NavBar />
            <SloganSection />
            <div className="organizers-page">
                <h2>Organizadores</h2>
                {!isAuthenticated ? (
                    <div className="alert alert-warning">Debes iniciar sesión para ver el contenido.</div>
                ) : (
                    <div className="organizers-list">
                        {organizers.map(org => (
                            <OrganizerPreview
                                key={org.organizer.id}
                                organizer={org.organizer}
                                onClick={() => handleOrganizerClick(org)}
                            />
                        ))}
                        {selectedOrganizer && (
                            <OrganizerDetail
                                organizer={selectedOrganizer}
                                onClose={handleClose}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrganizersPage;
