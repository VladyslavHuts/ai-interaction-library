import React from 'react';
import './DynamicUI.scss';

const DynamicUI: React.FC = () => {
    return (
        <div className="dynamic-ui">
            <h1 className="dynamic-ui__title">🎨 Dynamic UI Page</h1>
            <p className="dynamic-ui__description">
                This page will demonstrate adaptive UI features like font scaling and color themes.
            </p>
        </div>
    );
};

export default DynamicUI;
