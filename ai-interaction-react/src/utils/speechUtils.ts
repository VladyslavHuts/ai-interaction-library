import ukTriggers from '../assets/voice/commandTriggers.uk.json';
import enTriggers from '../assets/voice/commandTriggers.en.json';
import { VoiceCommand, VoiceCommandType } from '../types/voice.types';

const dictionaries: Record<'uk-UA' | 'en-US', Record<VoiceCommandType, string[]>> = {
    'uk-UA': ukTriggers as Record<VoiceCommandType, string[]>,
    'en-US': enTriggers as Record<VoiceCommandType, string[]>
};

export function matchVoiceCommand(
    transcript: string,
    lang: 'uk-UA' | 'en-US' = 'uk-UA'
): VoiceCommand | null {
    const lower = transcript.toLowerCase();
    const dict = dictionaries[lang];

    for (const type in dict) {
        const phrases = dict[type as VoiceCommandType];
        for (const phrase of phrases) {
            if (lower.includes(phrase)) {
                return {
                    type: type as VoiceCommandType,
                    value: extractValue(lower, phrase), // передаємо phrase
                    rawText: transcript
                };
            }
        }
    }

    return null;
}

// 🎯 Витягує значення з тексту (наприклад, "на 50%" → 50)
export function extractValue(text: string, _phrase: string): string | number | undefined {
    const percent = text.match(/(\d+)\s?%/);
    if (percent) return Number(percent[1]);

    const pixels = text.match(/(\d+)\s?(піксел|px)/);
    if (pixels) return Number(pixels[1]);

    const seconds = text.match(/(\d+)\s?(секунд|сек|seconds?)/);
    if (seconds) return Number(seconds[1]);

    const number = text.match(/(\d+)/);
    if (number) return Number(number[1]);

    const color = text.match(
        /(червоний|синій|зелений|білий|чорний|рожевий|жовтий|сірий|блакитний|blue|red|green|white|black|pink|gray|grey|yellow|cyan)/
    );
    if (color) return color[1];

    return undefined;
}
