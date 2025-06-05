import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const features = [
    {
        to: '/camera',
        icon: '🎥',
        title: 'Camera',
        description: 'Control interface with gestures and lighting.',
    },
    {
        to: '/voice',
        icon: '🎤',
        title: 'Voice',
        description: 'Use voice commands to navigate and control.',
    },
    {
        to: '/assistant',
        icon: '🤖',
        title: 'Assistant',
        description: 'Smart assistant for adaptive interaction.',
    },
    {
        to: '/dynamic-ui',
        icon: '🎨',
        title: 'Dynamic UI',
        description: 'Auto-adjust fonts and colors to your needs.',
    },
];

const Home: React.FC = () => {
    return (
        <div className="home">
            <div className="home__container">
                <h1 className="home__title home__title--typewriter">
                    {'AI Interaction Library'.split('').map((char, i) => (
                        <span className={`home__letter letter-${i + 1}`} key={i}>
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                <p className="home__description">
                    Explore adaptive interaction components built with React.
                </p>
                <div className="home__grid">
                    {features.map(({to, icon, title, description}) => (
                        <Link to={to} className="home__card" key={to}>
                            <div className="home__card-icon">{icon}</div>
                            <h3 className="home__card-title">{title}</h3>
                            <p className="home__card-description">{description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
