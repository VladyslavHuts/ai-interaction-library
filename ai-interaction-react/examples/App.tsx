import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Camera, Voice, DynamicUI, Assistant } from '../src';
import VoiceNavigationDemo from './pages/voiceNavigationDemo';
import Header from './components/Header';
import Footer from './components/Footer';
import { NavigationController } from '../src/utils/NavigationController';


// 👇 Компонент, який передає navigate у NavigationController
const NavigationInitializer: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        NavigationController.setNavigator(navigate);
    }, [navigate]);

    useEffect(() => {
        NavigationController.setCurrentPath(location.pathname);
    }, [location.pathname]);

    return null; // нічого не рендерить
};

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="main-container">
                    <NavigationInitializer /> {/* 👈 обов’язково */}
                    <Routes>
                        <Route path="/" element={<h2>Welcome to AI Interaction Demo</h2>} />
                        <Route path="/camera" element={<Camera />} />
                        <Route path="/voice" element={<Voice />} />
                        <Route path="/voice-nav" element={<VoiceNavigationDemo />} />
                        <Route path="/dynamic-ui" element={<DynamicUI />} />
                        <Route path="/assistant" element={<Assistant />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
