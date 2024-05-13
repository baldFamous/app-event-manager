import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import OrganizersList from '../components/OrganizersList/OrganizersList';
import SloganSection from "../components/Slogan/SloganSection";

function OrganizersPage() {
    return (
        <div>
            <NavBar />
            <SloganSection />
            <OrganizersList />
        </div>
    );
}

export default OrganizersPage;