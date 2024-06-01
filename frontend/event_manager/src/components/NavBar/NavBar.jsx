import React, { useContext, useState } from 'react';
import './NavBar.css';
import logoImage from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../api/authContext';
import AccountMenu from '../login_comp/AccountMenu/AccountMenu';

function NavBar() {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logoImage} alt="Logo" className="logo-image" />
            </div>
            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/organizers">Organizers</Link>
                <Link to="/help">Help</Link>
                {user ? (
                    <AccountMenu /> // Muestra el menú de cuenta si el usuario está autenticado
                ) : (
                    <Link to="/login">Iniciar Sesión</Link>
                )}
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}

export default NavBar;
