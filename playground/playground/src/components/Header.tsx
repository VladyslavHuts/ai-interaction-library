import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout/header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    AI Interaction
                </Link>
                <nav className="header__nav">
                    <Link to="/camera" className="header__link">Camera</Link>
                    <Link to="/voice" className="header__link">Voice</Link>
                    <Link to="/assistant" className="header__link">Assistant</Link>
                    <Link to="/dynamic-ui" className="header__link">Dynamic UI</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
