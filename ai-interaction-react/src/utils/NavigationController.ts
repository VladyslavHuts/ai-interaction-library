import { routeRegistry } from './routes';

let navigateFn: ((path: string) => void) | null = null;
let currentPath: string = '/'; // зберігаємо поточний маршрут

const SCROLL_STEP = 100;
const ZOOM_STEP = 10; // у відсотках

export const NavigationController = {
    // Прокрутка
    scrollDown: (px = SCROLL_STEP) => window.scrollBy({ top: px, behavior: 'smooth' }),
    scrollUp: (px = SCROLL_STEP) => window.scrollBy({ top: -px, behavior: 'smooth' }),
    scrollRight: (px = SCROLL_STEP) => window.scrollBy({ left: px, behavior: 'smooth' }),
    scrollLeft: (px = SCROLL_STEP) => window.scrollBy({ left: -px, behavior: 'smooth' }),

    // Масштабування
    zoomIn: (percent = ZOOM_STEP) => {
        const current = getCurrentZoom();
        document.body.style.zoom = `${current + percent}%`;
    },
    zoomOut: (percent = ZOOM_STEP) => {
        const current = getCurrentZoom();
        document.body.style.zoom = `${Math.max(current - percent, 10)}%`;
    },

    // ✅ Скидання до початкового положення
    resetView: () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.body.style.zoom = '100%';
    },

    // Встановлення функції навігації
    setNavigator(fn: (path: string) => void) {
        navigateFn = fn;
    },

    // Встановлення поточного шляху
    setCurrentPath(path: string) {
        currentPath = path;
    },

    // Перехід за назвою
    goToPage(name: string) {
        if (!navigateFn) return;
        const route = routeRegistry.find(r =>
            r.names.some((n: string) => name.toLowerCase().includes(n))
        );
        if (route) {
            navigateFn(route.path);
            currentPath = route.path;
        }
    },

    // Перехід на наступну сторінку
    goNext() {
        if (!navigateFn) return;
        const idx = routeRegistry.findIndex(r => r.path === currentPath);
        if (idx !== -1 && idx < routeRegistry.length - 1) {
            const next = routeRegistry[idx + 1];
            navigateFn(next.path);
            currentPath = next.path;
        }
    },

    // Перехід на попередню сторінку
    goPrevious() {
        if (!navigateFn) return;
        const idx = routeRegistry.findIndex(r => r.path === currentPath);
        if (idx > 0) {
            const prev = routeRegistry[idx - 1];
            navigateFn(prev.path);
            currentPath = prev.path;
        }
    },
};

// Допоміжна функція
function getCurrentZoom(): number {
    const zoom = document.body.style.zoom;
    if (zoom && zoom.includes('%')) {
        return parseFloat(zoom);
    }
    return window.devicePixelRatio * 100; // fallback
}
