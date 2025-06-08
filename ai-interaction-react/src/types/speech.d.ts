export {};

declare global {
    interface Window {
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
        SpeechRecognition?: {
            new(): SpeechRecognition;
        };
    }

    var webkitSpeechRecognition: {
        prototype: SpeechRecognition;
        new (): SpeechRecognition;
    };

    var SpeechRecognition: {
        prototype: SpeechRecognition;
        new (): SpeechRecognition;
    };

    interface SpeechRecognition extends EventTarget {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        maxAlternatives: number;
        onresult: ((event: SpeechRecognitionEvent) => void) | null;
        onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
        onaudiostart?: ((event: Event) => void) | null;
        onsoundstart?: ((event: Event) => void) | null;
        onspeechstart?: ((event: Event) => void) | null;
        onspeechend?: ((event: Event) => void) | null;
        onsoundend?: ((event: Event) => void) | null;
        onaudioend?: ((event: Event) => void) | null;
        onstart?: ((event: Event) => void) | null;
        onend?: ((event: Event) => void) | null;
        start(): void;
        stop(): void;
        abort(): void;
    }

    interface SpeechRecognitionEvent extends Event {
        readonly resultIndex: number;
        readonly results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionErrorEvent extends Event {
        error: string;
        message: string;
    }

    interface SpeechRecognitionResultList {
        [index: number]: SpeechRecognitionResult;
        length: number;
        item(index: number): SpeechRecognitionResult;
    }

    interface SpeechRecognitionResult {
        [index: number]: SpeechRecognitionAlternative;
        isFinal: boolean;
        length: number;
        item(index: number): SpeechRecognitionAlternative;
    }

    interface SpeechRecognitionAlternative {
        transcript: string;
        confidence: number;
    }
}
