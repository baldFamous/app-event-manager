import React from 'react';
import './SloganSection.css';
import sloganImage from '../../assets/logo.png';// Asegúrate de tener una imagen en tu carpeta de assets

function SloganSection() {
    return (
        <div className="slogan-section">
            <img src={sloganImage} alt="Slogan" className="slogan-image"/>
            <h1 className="slogan-text">Los Mejores Eventos Cerca de Ti</h1>
        </div>
    );
}

export default SloganSection;