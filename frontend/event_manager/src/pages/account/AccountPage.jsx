import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../api/authContext';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';
import NavBar from "../../components/NavBar/NavBar";

function AccountPage() {
    const { user, updateUsername, updatePassword, fetchUserById } = useContext(AuthContext);
    const navigate = useNavigate();

    const [newUsername, setUsername] = useState('');
    const [username, setNewUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const userId = localStorage.getItem('userId');
                    const userDetails = await fetchUserById(userId);
                    console.log(userDetails);
                    setNewUsername(userDetails.username);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            fetchUserData();
        } else {
            navigate('/login'); // Redirigir a la página de inicio de sesión si no hay usuario
        }
    }, [user, navigate, fetchUserById]);

    const handleUsernameUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUsername(newUsername);
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
                                Nombre de usuario actual: {username}
                            </label>
                            <label>
                                Nuevo nombre de usuario:
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                            <button type="submit">Actualizar Nombre de Usuario</button>
                        </form>
                        <br/>

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
                    </>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    );
}

export default AccountPage;
