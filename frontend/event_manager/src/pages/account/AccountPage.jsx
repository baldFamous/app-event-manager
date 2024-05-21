import React, { useContext, useState } from 'react';
import { AuthContext } from '../../api/authContext';
import './AccountPage.css';

function AccountPage() {
    const { user, login } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(user.imageUrl);

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Implementa la lógica para actualizar los detalles del usuario
        // Aquí solo estamos actualizando el estado localmente como ejemplo
        login({ ...user, username, imageUrl: image });
    };

    return (
        <div className="account-page">
            <h1>Mi Cuenta</h1>
            <form onSubmit={handleUpdate}>
                <label>
                    Nombre de usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Nueva contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    Imagen de perfil:
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default AccountPage;