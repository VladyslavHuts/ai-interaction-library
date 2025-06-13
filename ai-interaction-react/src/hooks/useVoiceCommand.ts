import { useRef } from 'react';
import { VoiceCommand } from '../types/voice.types';
import { matchVoiceCommand } from '../utils/speechUtils';

interface UseVoiceCommandOptions {
    onCommand: (command: VoiceCommand) => void;
    lang?: 'uk-UA' | 'en-US';
    cooldownMs?: number;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

export function useVoiceCommand({
                                    onCommand,
                                    lang = 'uk-UA',
                                    cooldownMs = 1000,
                                }: UseVoiceCommandOptions) {
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const lastExecutionRef = useRef<number>(0);

    const initRecognition = (): SpeechRecognition | null => {
        const SpeechRecognitionClass =
            window.SpeechRecognition ||
            (window as typeof window & { webkitSpeechRecognition?: SpeechRecognitionConstructor })
                .webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            console.error('❌ Web Speech API not supported in this browser.');
            return null;
        }

        const recognition = new SpeechRecognitionClass();
        recognition.lang = lang;
        recognition.continuous = true;
        recognition.interimResults = false;

        console.log(`[SpeechRecognition] ✅ Ініціалізовано з мовою: ${lang}`);

        recognition.onstart = () => {
            console.log('[SpeechRecognition] 🔊 Розпізнавання запущено');
        };

        recognition.onend = () => {
            console.log('[SpeechRecognition] ⏹️ Розпізнавання завершено');
            if (recognitionRef.current) {
                console.log('[SpeechRecognition] 🔁 Перезапуск розпізнавання');
                recognitionRef.current.start();
            }
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join(' ')
                .trim()
                .toLowerCase();

            console.log('🧠 Розпізнано:', transcript);

            const now = Date.now();
            const command = matchVoiceCommand(transcript, lang);

            if (!command) {
                console.warn(`[SpeechRecognition] 🟥 Команду не розпізнано для: "${transcript}"`);
                return;
            }

            if (now - lastExecutionRef.current > cooldownMs) {
                console.log('✅ Команда:', command);
                onCommand(command);
                lastExecutionRef.current = now;

                recognition.stop();
                setTimeout(() => recognition.start(), 300);
            } else {
                console.log('⏳ Ігноровано через cooldown');
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error(`[SpeechRecognition] ❌ Помилка: ${event.error}`);
            if (['no-speech', 'network'].includes(event.error)) {
                recognition.stop();
                setTimeout(() => recognition.start(), 300);
            }
        };

        return recognition;
    };

    const start = () => {
        if (recognitionRef.current) {
            console.warn('[SpeechRecognition] ⚠️ Вже запущено');
            return;
        }
        const rec = initRecognition();
        if (rec) {
            recognitionRef.current = rec;
            rec.start();
        }
    };

    const stop = () => {
        console.log('[SpeechRecognition] 🛑 Зупинка');
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        lastExecutionRef.current = 0;
    };

    return { start, stop };
}
