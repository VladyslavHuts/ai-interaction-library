import { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { useVoiceCommand } from '../hooks/useVoiceCommand';
import { handleVoiceCommand } from '../utils/handleVoiceCommand';

const Voice = () => {
    const { lang, changeLang } = useLang();
    const [listening, setListening] = useState(false);
    const [lastCommand, setLastCommand] = useState<string | null>(null);

    const { start, stop } = useVoiceCommand({
        lang,
        onCommand: (cmd) => {
            handleVoiceCommand(cmd);
            setLastCommand(`${cmd.type} (${cmd.value ?? '—'})`);
        },
    });

    const toggleListening = () => {
        if (listening) {
            stop();
            setListening(false);
        } else {
            start();
            setListening(true);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                padding: 12,
                background: '#222',
                color: '#fff',
                borderRadius: 8,
                fontFamily: 'sans-serif',
                fontSize: 14,
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                zIndex: 1000,
                width: 260
            }}
        >
            <div style={{ fontWeight: 600 }}>🎤 {listening ? 'Слухаю...' : 'Неактивний'}</div>

            <button
                onClick={toggleListening}
                style={{
                    marginTop: 10,
                    background: listening ? '#d33' : '#0a0',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 500,
                }}
            >
                {listening ? 'Зупинити' : 'Запустити'}
            </button>

            <div style={{ marginTop: 10 }}>
                🌐 Мова:
                <button
                    onClick={() => changeLang('uk-UA')}
                    disabled={lang === 'uk-UA'}
                    style={{
                        marginLeft: 6,
                        background: lang === 'uk-UA' ? '#555' : '#333',
                        color: '#fff',
                        padding: '4px 8px',
                        border: 'none',
                        borderRadius: 4,
                        cursor: lang === 'uk-UA' ? 'not-allowed' : 'pointer',
                    }}
                >
                    🇺🇦 UA
                </button>
                <button
                    onClick={() => changeLang('en-US')}
                    disabled={lang === 'en-US'}
                    style={{
                        marginLeft: 6,
                        background: lang === 'en-US' ? '#555' : '#333',
                        color: '#fff',
                        padding: '4px 8px',
                        border: 'none',
                        borderRadius: 4,
                        cursor: lang === 'en-US' ? 'not-allowed' : 'pointer',
                    }}
                >
                    🇬🇧 EN
                </button>
            </div>

            {lastCommand && (
                <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
                    🧠 Команда: <strong>{lastCommand}</strong>
                </div>
            )}
        </div>
    );
};

export default Voice;
