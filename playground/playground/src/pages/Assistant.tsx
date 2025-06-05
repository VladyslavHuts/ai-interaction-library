import React from 'react';
import './Assistant.scss';

const Assistant: React.FC = () => {
    return (
        <div className="assistant">
            <h1 className="assistant__title">🤖 Assistant Page</h1>
            <p className="assistant__description">
                This page will showcase the interactive assistant component.
            </p>
        </div>
    );
};

export default Assistant;
