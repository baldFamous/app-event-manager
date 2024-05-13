import React from 'react';
import './NavBar.css';
import logoImage from '../../assets/logo.svg';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logoImage} alt="Logo" className="logo-image"/>
            </div>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/events">Eventos</a>
                <a href="/organizers">Organizadores</a>
                <a href="/help">Ayuda</a>
                <a href="/login">Iniciar Sesión</a>
            </div>
        </nav>
    );
}

export default NavBar;