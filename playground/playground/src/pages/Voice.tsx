
import React from 'react';
import './Voice.scss';

const Voice: React.FC = () => {
    return (
        <div className="voice">
            <h1 className="voice__title">🎤 Voice Page</h1>
            <p className="voice__description">
                Here will be the voice command demo using Web Speech API.
            </p>
        </div>
    );
};

export default Voice;