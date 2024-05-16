import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './HelpPage.css';

function HelpPage() {
    return (
        <div>
            <NavBar />
            <div className="help-section">
                <h1>¿Cómo puedo ayudarte?</h1>
                <section>
                    <h2>Propósito del Sitio</h2>
                    <p>Este sitio está diseñado para permitir a los usuarios descubrir eventos, reservar entradas y obtener información sobre los organizadores de eventos. Nuestro objetivo es simplificar el proceso de encontrar y asistir a eventos de todo tipo.</p>
                </section>
                <section>
                    <h2>Cómo Funciona</h2>
                    <p>Los usuarios pueden buscar eventos por fecha y localidad, ver detalles sobre cada evento, y realizar reservaciones en línea. Los organizadores pueden crear y gestionar eventos, incluyendo descripciones, fechas y opciones de reserva.</p>
                </section>
                <section>
                    <h2>Finalidad</h2>
                    <p>La finalidad de nuestro sitio es proporcionar una plataforma accesible y fácil de usar que conecte a los organizadores de eventos con el público interesado. Queremos fomentar una mayor participación en eventos culturales, educativos y de entretenimiento.</p>
                </section>
            </div>
        </div>
    );
}

export default HelpPage;