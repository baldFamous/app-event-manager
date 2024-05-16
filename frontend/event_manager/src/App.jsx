import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import EventPage from './pages/event/EventPage';
import './App.css';
import OrganizersPage from "./pages/OrganizersPage";
import HelpPage from "./pages/help/HelpPage";
import LoginPage from "./pages/login/LoginPage";
import EventDetailPage from "./pages/event_detail/EventDetailPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventPage />} />
                    <Route path="/events/:id" element={<EventDetailPage />} />
                    <Route path="/organizers" element={<OrganizersPage/>} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;