import { NavigationController } from './NavigationController';

export const parseCommand = (transcript: string): (() => void) | null => {
    const lower = transcript.toLowerCase().trim();

    // Витягуємо значення для пікселів і відсотків
    const pxMatch = lower.match(/(\d+)\s?(піксел(?:ів|і)?|px)?/);
    const percentMatch = lower.match(/(\d+)\s?(%|відсот(?:ків|ки)?)/);

    const px = pxMatch ? parseInt(pxMatch[1]) : 100;
    const percent = percentMatch ? parseInt(percentMatch[1]) : 10;

    console.log('[parseCommand] 💬 Розпізнано:', lower);
    console.log('[parseCommand] 📏 px:', px, '| %:', percent);

    // === Прокрутка ===
    if (lower.includes('вниз') || lower.includes('down')) {
        return () => NavigationController.scrollDown(px);
    }
    if (lower.includes('вгору') || lower.includes('up')) {
        return () => NavigationController.scrollUp(px);
    }
    if (
        lower.includes('вправо') ||
        lower.includes('праворуч') ||
        lower.includes('right')
    ) {
        return () => NavigationController.scrollRight(px);
    }
    if (
        lower.includes('вліво') ||
        lower.includes('ліворуч') ||
        lower.includes('left')
    ) {
        return () => NavigationController.scrollLeft(px);
    }

    // === Масштабування ===
    if (lower.includes('збільшити') || lower.includes('zoom in')) {
        return () => NavigationController.zoomIn(percent);
    }
    if (lower.includes('зменшити') || lower.includes('zoom out')) {
        return () => NavigationController.zoomOut(percent);
    }

    // === Навігація між сторінками ===
    if (lower.includes('наступна') || lower.includes('next')) {
        return () => NavigationController.goNext();
    }
    if (lower.includes('попередня') || lower.includes('previous')) {
        return () => NavigationController.goPrevious();
    }

    // === Відкрити за назвою ===
    if (
        lower.includes('перейти') ||
        lower.includes('відкрити') ||
        lower.includes('go to') ||
        lower.includes('open')
    ) {
        return () => NavigationController.goToPage(lower);
    }

    if (
        lower.includes('reset') ||
        lower.includes('initial position') ||
        lower.includes('початкове') ||
        lower.includes('скинути')
    ) {
        return () => NavigationController.resetView();
    }

    if (/\b(перейти|відкрити|go to|open)\b/.test(lower)) {
        const cleaned = lower
            .replace(/\b(перейти|відкрити|go to|open|на|сторінку)\b/g, '')
            .trim();
        return () => NavigationController.goToPage(cleaned);
    }

    return null;
};
