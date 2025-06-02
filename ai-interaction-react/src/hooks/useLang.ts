import { useState, useEffect } from 'react';

export type SupportedLang = 'uk-UA' | 'en-US';

export function useLang(defaultLang: SupportedLang = 'uk-UA') {
    const [lang, setLang] = useState<SupportedLang>(defaultLang);

    useEffect(() => {
        const storedLang = localStorage.getItem('voice-lang') as SupportedLang;
        if (storedLang) setLang(storedLang);
    }, []);

    const changeLang = (newLang: SupportedLang) => {
        setLang(newLang);
        localStorage.setItem('voice-lang', newLang);
    };

    return { lang, changeLang };
}
