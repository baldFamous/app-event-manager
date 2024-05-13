import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import './App.css';
import OrganizersPage from "./pages/OrganizersPage";
import HelpPage from "./pages/HelpPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventPage />} />
                    <Route path="/organizers" element={<OrganizersPage/>} />
                    <Route path="/help" element={<HelpPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;