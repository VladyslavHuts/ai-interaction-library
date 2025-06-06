import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/layout/header.scss';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/camera', label: 'Camera' },
    { path: '/voice', label: 'Voice' },
    { path: '/assistant', label: 'Assistant' },
    { path: '/dynamic-ui', label: 'Dynamic UI' },
];

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">AI Interaction</Link>
                <nav className="header__nav">
                    <div className="header__nav-inner">
                        {navLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`header__link ${location.pathname === path ? 'active' : ''}`}
                            >
                                {label}
                                {location.pathname === path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="header__underline"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
