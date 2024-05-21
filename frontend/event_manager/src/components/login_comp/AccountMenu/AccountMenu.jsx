import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../api/authContext';
import { Link } from 'react-router-dom';
import './AccountMenu.css';

function AccountMenu() {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="account-menu">
            <button onClick={toggleMenu}>{user.username}</button>
            {menuOpen && (
                <div className="account-dropdown">
                    <button onClick={logout}>Cerrar Sesión</button>
                    <Link to="/account">Mi Cuenta</Link>
                    {user.role === 'Organizador' && (
                        <Link to="/add-event">Añadir Evento</Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default AccountMenu;