import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../api/authContext';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';
import NavBar from "../../components/NavBar/NavBar";

function AccountPage() {
    const { user, updateUsername, updatePassword, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setImage(user.imageUrl);
        } else {
            navigate('/login'); // Redirigir a la página de inicio de sesión si no hay usuario
        }
    }, [user, navigate]);

    const handleUsernameUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUsername(username);
            alert('Nombre de usuario actualizado correctamente.');
        } catch (error) {
            alert('Error al actualizar el nombre de usuario.');
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            await updatePassword(oldPassword, newPassword);
            alert('Contraseña actualizada correctamente.');
        } catch (error) {
            alert('Error al actualizar la contraseña.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirigir a la página de inicio de sesión
    };

    return (
        <div>
            <NavBar />
            <br />
            <br />
            <div className="account-page">
                <h1>Gestión de usuario</h1>
                {user ? (
                    <>
                        <form onSubmit={handleUsernameUpdate}>
                            <label>
                                Nombre de usuario actual: {user.username}
                            </label>
                            <label>
                                Nuevo nombre de usuario:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                            <button type="submit">Actualizar Nombre de Usuario</button>
                        </form>

                        <form onSubmit={handlePasswordUpdate}>
                            <label>
                                Contraseña antigua:
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                Nueva contraseña:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                            <button type="submit">Actualizar Contraseña</button>
                        </form>

                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    );
}

export default AccountPage;
