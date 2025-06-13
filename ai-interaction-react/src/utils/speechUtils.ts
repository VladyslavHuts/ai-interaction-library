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
                    value: extractValue(lower, phrase),
                    rawText: transcript
                };
            }
        }
    }

    return null;
}

export function extractValue(text: string, phrase: string): string | number | undefined {
    const afterPhrase = text.split(phrase)[1]?.trim() || '';

    const percent = afterPhrase.match(/(\d+)\s?%/);
    if (percent) return Number(percent[1]);

    const pixels = afterPhrase.match(/(\d+)\s?(піксел|px)/);
    if (pixels) return Number(pixels[1]);

    const seconds = afterPhrase.match(/(\d+)\s?(секунд|сек|seconds?)/);
    if (seconds) return Number(seconds[1]);

    const number = afterPhrase.match(/(\d+)/);
    if (number) return Number(number[1]);

    const color = afterPhrase.match(
        /(червоний|синій|зелений|білий|чорний|рожевий|жовтий|сірий|блакитний|blue|red|green|white|black|pink|gray|grey|yellow|cyan)/
    );
    if (color) return color[1];

    return undefined;
}


