import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import EventPage from './pages/event/EventPage';
import './App.css';
import OrganizersPage from "./pages/organizers/OrganizersPage";
import HelpPage from "./pages/help/HelpPage";
import LoginPage from "./pages/login/LoginPage";
import EventDetailPage from "./pages/event_detail/EventDetailPage";
import Footer from "./components/Footer/Footer";
import AccountPage from "./pages/account/AccountPage";
import {AuthProvider} from "./api/authContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/events" element={<EventPage />} />
                            <Route path="/events/:id" element={<EventDetailPage />} />
                            <Route path="/organizers" element={<OrganizersPage />} />
                            <Route path="/help" element={<HelpPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/account" element={<AccountPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
// <Route path="/add-event" element={<AddEventPage />} />