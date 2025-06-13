import * as React from 'react';
import { useState } from 'react';
import '@ai/styles/components/assistant.scss';
import { useAssistant } from '../hooks/useAssistant';

const Assistant: React.FC = () => {
    const { sendQuery, responses } = useAssistant();
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            sendQuery(query);
            setQuery('');
        }
    };

    return (
        <div className="assistant">
            <div className="assistant__chat">
                {responses.map((res, idx) => (
                    <div key={idx} className={`assistant__message ${res.type}`}>
                        {res.message}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="assistant__form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Assistant;
