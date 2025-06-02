import { useRef } from 'react';
import { VoiceCommand } from '../types/voice.types';
import { matchVoiceCommand } from '../utils/speechUtils';

interface UseVoiceCommandOptions {
    onCommand: (command: VoiceCommand) => void;
    lang?: 'uk-UA' | 'en-US';
    cooldownMs?: number;
}

export function useVoiceCommand({
                                    onCommand,
                                    lang = 'uk-UA',
                                    cooldownMs = 1000,
                                }: UseVoiceCommandOptions) {
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const lastExecutionRef = useRef<number>(0);

    const initRecognition = (): SpeechRecognition | null => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn('Web Speech API not supported');
            return null;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = lang;
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join(' ')
                .trim()
                .toLowerCase();

            const now = Date.now();
            const command = matchVoiceCommand(transcript, lang);

            if (command && now - lastExecutionRef.current > cooldownMs) {
                onCommand(command);
                lastExecutionRef.current = now;
            }

            recognition.stop();
            setTimeout(() => recognition.start(), 300);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.warn('🎤 Speech recognition error:', event.error);
            if (['no-speech', 'network'].includes(event.error)) {
                recognition.stop();
                setTimeout(() => recognition.start(), 300);
            }
        };

        return recognition;
    };

    const start = () => {
        if (recognitionRef.current) return;
        const rec = initRecognition();
        if (rec) {
            recognitionRef.current = rec;
            rec.start();
        }
    };

    const stop = () => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        lastExecutionRef.current = 0;
    };

    return { start, stop };
}
