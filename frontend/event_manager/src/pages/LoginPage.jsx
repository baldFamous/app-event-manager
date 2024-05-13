import React, { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import './LoginPage.css';

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="login-page-container"> {}
            <NavBar />
            {isLogin ? <LoginForm onToggleForm={toggleForm} /> : <RegisterForm onToggleForm={toggleForm} />}
            <button onClick={toggleForm} className="login-toggle-button">
                {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
            <Footer />
        </div>
    );
}

export default LoginPage;
