import { useLang } from '../hooks/useLang';
import { useVoiceCommand } from '../hooks/useVoiceCommand';
import { handleVoiceCommand } from '../utils/handleVoiceCommand';
import { useState } from 'react';

export const Voice = () => {
    const { lang, changeLang } = useLang();
    const [listening, setListening] = useState(false);
    const [lastCommand, setLastCommand] = useState<string | null>(null);

    const { start, stop } = useVoiceCommand({
        lang,
        onCommand: (cmd) => {
            handleVoiceCommand(cmd);
            setLastCommand(`${cmd.type} (${cmd.value ?? '—'})`);
        }
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
        <div style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            padding: 12,
            background: '#222',
            color: '#fff',
            borderRadius: 8
        }}>
            <div>🎤 {listening ? 'Слухаю...' : 'Неактивний'}</div>

            <button onClick={toggleListening} style={{
                marginTop: 6,
                background: listening ? '#c00' : '#0a0',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 6,
                cursor: 'pointer'
            }}>
                {listening ? 'Стоп' : 'Запустити'}
            </button>

            <div style={{ marginTop: 8 }}>
                🌐 Мова:
                <button onClick={() => changeLang('uk-UA')} disabled={lang === 'uk-UA'} style={{ marginLeft: 6 }}>
                    🇺🇦 Українська
                </button>
                <button onClick={() => changeLang('en-US')} disabled={lang === 'en-US'} style={{ marginLeft: 6 }}>
                    🇬🇧 English
                </button>
            </div>

            {lastCommand && (
                <div style={{ marginTop: 8, fontSize: 12 }}>
                    🧠 Команда: <strong>{lastCommand}</strong>
                </div>
            )}
        </div>
    );
};
