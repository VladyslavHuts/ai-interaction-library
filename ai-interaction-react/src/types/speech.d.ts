export {};

declare global {
    interface Window {
        webkitSpeechRecognition: {
            new (): SpeechRecognition;
        };
    }

    interface SpeechRecognition extends EventTarget {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        onresult: ((event: SpeechRecognitionEvent) => void) | null;
        onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
        start(): void;
        stop(): void;
    }

    interface SpeechRecognitionEvent extends Event {
        readonly results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionErrorEvent extends Event {
        error: string;
    }

    interface SpeechRecognitionResultList {
        [index: number]: SpeechRecognitionResult;
        length: number;
    }

    interface SpeechRecognitionResult {
        [index: number]: SpeechRecognitionAlternative;
        isFinal: boolean;
        length: number;
    }

    interface SpeechRecognitionAlternative {
        transcript: string;
        confidence: number;
    }
}
