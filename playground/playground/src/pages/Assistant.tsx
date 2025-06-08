import React from 'react';
import AssistantComponent from 'ai-interaction-react/components/AssistantComponent'


const Assistant: React.FC = () => {
    return (
        <div className="assistant-page">
            <h1 className="assistant__title">Assistant Page</h1>
            <p className="assistant__description">
                This page showcases the interactive assistant component.
            </p>

            <AssistantComponent />
        </div>
    );
};

export default Assistant;
