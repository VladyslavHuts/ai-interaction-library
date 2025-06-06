import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCamera from '../assets/Image_camera-light.png';
import ImageVoice from '../assets/Image_voice-ligrt.png'
import ImageDynamicUI from '../assets/Image_dynamicUI-light.png'
import ImagesAssistant from '../assets/Image_assistant-light.png'
import './Home.scss';

const initialFeatures = [
    {
        to: '/camera',
        icon: ImageCamera,
        title: 'Camera',
        description: 'Control interface with gestures and lighting.',
    },
    {
        to: '/voice',
        icon: ImageVoice,
        title: 'Voice',
        description: 'Use voice commands to navigate and control.',
    },
    {
        to: '/assistant',
        icon: ImagesAssistant,
        title: 'Assistant',
        description: 'Smart assistant for adaptive interaction.',
    },
    {
        to: '/dynamic-ui',
        icon: ImageDynamicUI,
        title: 'Dynamic UI',
        description: 'Auto-adjust fonts and colors to your needs.',
    },
];

const shuffleArray = (array: typeof initialFeatures) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const Home: React.FC = () => {
    const [features, setFeatures] = useState(initialFeatures);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            setFeatures((prev) => shuffleArray(prev));
        }, 4000);

        return () => clearInterval(interval);
    }, [paused]);

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

                <motion.div
                    layout
                    className="home__grid"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence>
                        {features.map(({ to, icon, title, description }) => (
                            <motion.div
                                layout
                                key={to}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link to={to} className="home__card" aria-label={title}>
                                    <img src={icon} alt={title} className="home__card-icon" />
                                    <h3 className="home__card-title">{title}</h3>
                                    <p className="home__card-description">{description}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
