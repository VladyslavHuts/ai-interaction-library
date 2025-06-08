import { useState } from 'react';

interface AssistantResponse {
    type: 'user' | 'assistant';
    message: string;
}

export const useAssistant = () => {
    const [responses, setResponses] = useState<AssistantResponse[]>([]);

    const sendQuery = (query: string) => {
        setResponses(prev => [...prev, { type: 'user', message: query }]);

        const simulatedResponse = generateSimulatedResponse(query);
        setTimeout(() => {
            setResponses(prev => [...prev, { type: 'assistant', message: simulatedResponse }]);
        }, 500);
    };

    const generateSimulatedResponse = (input: string): string => {
        const lower = input.toLowerCase();

        if (lower.includes('dark') || lower.includes('темний')) return 'Switching to dark mode.';
        if (lower.includes('light') || lower.includes('світлий')) return 'Switching to light mode.';
        if (lower.includes('help') || lower.includes('допомога')) return 'How can I assist you further?';
        if (lower.includes('reload') || lower.includes('перезавантаж')) return 'Reloading the page.';
        if (lower.includes('scroll down') || lower.includes('вниз')) return 'Scrolling down...';
        if (lower.includes('scroll up') || lower.includes('вгору')) return 'Scrolling up...';
        if (lower.includes('highlight') || lower.includes('виділи')) return 'Highlighting requested section.';
        if (lower.includes('open') || lower.includes('відкрий')) return 'Opening requested item.';
        if (lower.includes('close') || lower.includes('закрий')) return 'Closing current dialog.';
        if (lower.includes('search') || lower.includes('пошук')) return 'Initiating search...';
        if (lower.includes('stop') || lower.includes('зупинись')) return 'Stopping all actions.';
        if (lower.includes('start') || lower.includes('почни')) return 'Starting the assistant process.';
        if (lower.includes('mode') || lower.includes('режим')) return 'Adjusting mode settings.';
        if (lower.includes('language') || lower.includes('мова')) return 'Changing language settings.';

        return "Sorry, I didn't understand that yet.";
    };

    return { sendQuery, responses };
};
