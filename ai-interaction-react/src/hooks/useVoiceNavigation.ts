import { useRef } from 'react';
import { parseCommand } from '../utils/parseCommand';
import { NavigationController } from '../utils/NavigationController';

export function useVoiceNavigation(
    onTranscript?: (text: string) => void,
    currentPath?: string
) {
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const isListeningRef = useRef(false);
    const restartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const initRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return null;

        const recognition = new SpeechRecognition();
        recognition.lang = 'uk-UA';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[event.results.length - 1][0].transcript.toLowerCase();
            console.log('[Voice]', result);

            onTranscript?.(result);

            const action = parseCommand(result);
            if (action) {
                console.log('[Voice] ✅ Виконую команду...');
                action();
            } else {
                console.log('[Voice] ❌ Команда не розпізнана');
            }
        };

        recognition.onerror = (event: any) => {
            console.error('[Voice] ❌ Error:', event.error);
        };

        recognition.onend = () => {
            if (isListeningRef.current) {
                recognition.start();
            }
        };

        return recognition;
    };

    const restartRecognition = () => {
        if (!recognitionRef.current || !isListeningRef.current) return;

        try {
            (recognitionRef.current as any).onend = () => {
                if (isListeningRef.current) {
                    recognitionRef.current?.start();
                    console.log('[Voice] 🔄 Перезапуск завершено');
                }
            };
            recognitionRef.current.stop(); // зупиняємо — і onend автоматично запустить
            console.log('[Voice] ⏹ Зупинено для перезапуску...');
        } catch (err) {
            console.warn('[Voice] 🚫 Помилка при перезапуску:', err);
        }
    };


    const scheduleRestart = () => {
        if (restartTimer.current) clearTimeout(restartTimer.current);
        restartTimer.current = setTimeout(() => {
            restartRecognition();
            scheduleRestart(); // запланувати наступний перезапуск
        }, 2 * 60 * 1000); // кожні 2 хв
    };

    const startListening = () => {
        if (!recognitionRef.current) {
            recognitionRef.current = initRecognition();
        }
        isListeningRef.current = true;
        recognitionRef.current?.start();
        scheduleRestart(); // запустити автоперезапуск
    };

    const stopListening = () => {
        isListeningRef.current = false;
        recognitionRef.current?.stop();
        if (restartTimer.current) clearTimeout(restartTimer.current);
    };

    return { startListening, stopListening };
}
