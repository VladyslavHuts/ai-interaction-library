import React, { useState, useRef, useEffect } from 'react';
import './Voice.scss';
import VoiceWaveform from '../components/VoiceWaveform';
import CommandReference from '../components/CommandReference';

const Voice: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [commandLog, setCommandLog] = useState<string[]>([]);
    const [visualClass, setVisualClass] = useState<string>('');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition =
            (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = 'uk-UA';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            const executed = executeCommand(transcript);
            setCommandLog((prev) => [
                `${transcript} ${executed ? '✔️' : '❌'}`,
                ...prev.slice(0, 4),
            ]);
        };

        recognition.onerror = (e: any) => {
            console.error('Speech recognition error:', e);
        };

        recognitionRef.current = recognition;
    }, []);

    const toggleListening = () => {
        if (!isListening) {
            recognitionRef.current?.start();
            setIsListening(true);
        } else {
            recognitionRef.current?.stop();
            setIsListening(false);
        }
    };

    const executeCommand = (text: string): boolean => {
        const lower = text.toLowerCase();

        if (lower.includes('збільшити')) {
            setVisualClass('scaled');
        } else if (lower.includes('фон')) {
            setVisualClass('highlighted');
        } else if (lower.includes('скинути')) {
            setVisualClass('');
        } else {
            return false;
        }

        if (!lower.includes('скинути')) {
            setTimeout(() => setVisualClass(''), 1500);
        }

        return true;
    };

    return (
        <div className="voice">
            <div className="voice__container">
                <h1 className="voice__title">Voice Interaction Playground</h1>
                <p className="voice__description">
                    Control the interface with your voice. No clicks — just say it.
                </p>

                <div className="voice__content">
                    <div className="voice__mic-wrapper">
                        <div className={`voice__mic-box ${visualClass}`}>
                            <div className={`mic-button ${isListening ? 'listening-active' : ''}`}>
                                {isListening ? (
                                    <VoiceWaveform />
                                ) : (
                                    <svg
                                        className="mic-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="40"
                                        height="40"
                                        fill="white"
                                    >
                                        <path d="M12 14c1.66 0 3-1.34 3-3V5a3 3 0 10-6 0v6c0 1.66 1.34 3 3 3z" />
                                        <path d="M17 11c0 2.2-2 4-5 4s-5-1.8-5-4H5c0 3 2.3 5.4 5.5 5.9v1.1h3v-1.1c3.2-0.5 5.5-2.9 5.5-5.9h-2z" />
                                        <rect x="11.25" y="17" width="1.5" height="2" rx="0.75" />
                                        <rect x="9" y="20" width="6" height="2" rx="1" />
                                    </svg>
                                )}
                            </div>

                            <span className="voice__mic-description">
                                {isListening ? 'Listening...' : 'Not listening'}
                            </span>

                            <button className="voice__mic-button" onClick={toggleListening}>
                                {isListening ? 'Stop listening' : 'Start listening'}
                            </button>
                        </div>

                        <div className="voice__log-box">
                            <h3 className="voice__section-title">Voice Command Log</h3>
                            {commandLog.length > 0 ? (
                                commandLog.map((cmd, index) => (
                                    <p key={index} className="voice__command">
                                        ➜ {cmd}
                                    </p>
                                ))
                            ) : (
                                <p className="voice__substatus">No commands yet</p>
                            )}

                            {/* 🔁 Сюди перенесено перемикач мови */}
                            <div className="voice__language-toggle">
                                <label htmlFor="lang-select" className="voice__language-label">
                                    Language:
                                </label>
                                <select
                                    id="lang-select"
                                    className="voice__language-select"
                                    onChange={(e) => {
                                        const lang = e.target.value;
                                        if (recognitionRef.current) {
                                            recognitionRef.current.lang = lang;
                                            console.log(`🔄 Language changed to: ${lang}`);
                                        } else {
                                            console.warn('⚠ SpeechRecognition is not initialized yet.');
                                        }
                                    }}
                                    defaultValue="uk-UA"
                                >
                                    <option value="uk-UA">Українська</option>
                                    <option value="en-US">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="voice__footer">
                    <span>AI Engine: Web Speech API</span>
                    <span> | Language: uk-UA</span>
                    <span> ~140 ms</span>
                </div>

                <button className="voice__rate-btn">Rate the Library</button>

                <CommandReference />
            </div>
        </div>
    );
};

export default Voice;
