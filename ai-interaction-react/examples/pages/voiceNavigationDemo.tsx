import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoiceNavigation } from '../../src/hooks/useVoiceNavigation';
import { NavigationController } from '../../src/utils/NavigationController';
import '../styles/pages/voiceNavigation.css';
import AudioVisualizer from '../components/AudioVisualizer';

const VoiceNavigationDemo: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [log, setLog] = useState<string[]>([]);

    const navigate = useNavigate();
    const location = useLocation();

    // Підключаємо функцію навігації
    useEffect(() => {
        NavigationController.setNavigator(navigate);
    }, [navigate]);

    const { startListening, stopListening } = useVoiceNavigation((text) => {
        setLog((prev) => [...prev, `🎧 Почуто: "${text}"`]);
    }, location.pathname);

    const handleToggle = () => {
        if (isListening) {
            stopListening();
            setIsListening(false);
            setLog((prev) => [...prev, '🛑 Слухання зупинено']);
        } else {
            startListening();
            setIsListening(true);
            setLog((prev) => [...prev, '🎤 Слухання розпочато (uk-UA + en-US)']);
        }
    };

    return (
        <div className="voice-nav-page">
            <h1>Демо: Голосова навігація</h1>

            <button onClick={handleToggle} className="voice-nav-button">
                {isListening ? 'Зупинити' : 'Слухати'}
            </button>

            <button onClick={() => setLog([])} className="voice-nav-button secondary">
                Очистити журнал
            </button>

            <div className="voice-nav-log">
                <h3>Журнал подій:</h3>
                <ul>
                    {log.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            </div>

            <AudioVisualizer active={isListening} />

            <div className="voice-nav-scroll-area">
                <p>
                    Прокрути цю сторінку голосом. Спробуй фрази: <strong>"вниз", "вгору", "зменшити", "збільшити"</strong> або англійські: <strong>"down", "up", "zoom out", "zoom in"</strong>. <br />
                    Також спробуй навігаційні команди: <strong>"наступна", "попередня", "перейти на головну"</strong>.
                </p>
            </div>
        </div>
    );
};

export default VoiceNavigationDemo;
