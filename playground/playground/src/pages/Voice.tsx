import React, { useState, useEffect } from 'react';
import './Voice.scss';
import VoiceWaveform from '../components/VoiceWaveform.tsx';
import CommandReference from '../components/CommandReference.tsx';
import { useVoiceCommand } from '@ai/hooks/useVoiceCommand.ts';
import { handleVoiceCommand } from '@ai/utils/handleVoiceCommand.ts';
import { useLang } from '@ai/hooks/useLang.ts';
import { VoiceCommand } from '@ai/types/voice.types.ts';



const Voice: React.FC = () => {
    const { lang, changeLang } = useLang();
    const [isListening, setIsListening] = useState(false);
    const [commandLog, setCommandLog] = useState<string[]>([]);
    const [visualClass, setVisualClass] = useState<string>('');

    const { start, stop } = useVoiceCommand({
        lang,
        onCommand: (cmd: VoiceCommand) => {
            handleVoiceCommand(cmd);

            if (cmd.type === 'zoom_in' || cmd.type === 'zoom_out') {
                setVisualClass('scaled');
                setTimeout(() => setVisualClass(''), 1500);
            } else if (cmd.type === 'set_background') {
                setVisualClass('highlighted');
                setTimeout(() => setVisualClass(''), 1500);
            } else if (cmd.type === 'reset') {
                setVisualClass('');
            }

            setCommandLog((prev) => [
                `${cmd.rawText} (${cmd.type} ${cmd.value ?? ''})`,
                ...prev.slice(0, 4),
            ]);
        },
    });

    const toggleListening = () => {
        if (isListening) {
            stop();
            setIsListening(false);
        } else {
            start();
            setIsListening(true);
        }
    };

    useEffect(() => {
        if (isListening) {
            stop();
            start();
        }
    }, [lang]);

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
                                {isListening ? <VoiceWaveform /> : (
                                    <svg className="mic-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white">
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
                                    <p key={index} className="voice__command">➜ {cmd}</p>
                                ))
                            ) : (
                                <p className="voice__substatus">No commands yet</p>
                            )}

                            <div className="voice__language-toggle">
                                <label htmlFor="lang-select" className="voice__language-label">
                                    Language:
                                </label>
                                <select
                                    id="lang-select"
                                    className="voice__language-select"
                                    onChange={(e) => changeLang(e.target.value as 'uk-UA' | 'en-US')}
                                    value={lang}
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
                    <span> | Language: {lang}</span>
                    <span> ~140 ms</span>
                </div>

                <button className="voice__rate-btn">Rate the Library</button>

                <CommandReference />
            </div>
        </div>
    );
};

export default Voice;
