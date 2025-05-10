import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Camera, Voice, DynamicUI, Assistant } from '../src';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Header/>
                <main className="main-container">
                    <Routes>
                        <Route path="/" element={<h2>Welcome to AI Interaction Demo</h2>}/>
                        <Route path="/camera" element={<Camera/>}/>
                        <Route path="/voice" element={<Voice/>}/>
                        <Route path="/dynamic-ui" element={<DynamicUI/>}/>
                        <Route path="/assistant" element={<Assistant/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
);
};

export default App;
