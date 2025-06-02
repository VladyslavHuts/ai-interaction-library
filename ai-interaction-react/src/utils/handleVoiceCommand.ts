import { VoiceCommand } from '../types/voice.types';

export function handleVoiceCommand(command: VoiceCommand) {
    const { type, value } = command;

    switch (type) {
        case 'scroll_down':
            window.scrollBy({ top: typeof value === 'number' ? value : 100, behavior: 'smooth' });
            break;

        case 'scroll_up':
            window.scrollBy({ top: typeof value === 'number' ? -value : -100, behavior: 'smooth' });
            break;

        case 'zoom_in':
        case 'zoom_out': {
            const zoom = document.body.style.zoom ? parseFloat(document.body.style.zoom) : 1;
            const delta = typeof value === 'number' ? value / 100 : 0.1;
            const newZoom = type === 'zoom_in' ? zoom + delta : zoom - delta;
            document.body.style.zoom = newZoom.toString();
            break;
        }

        case 'reset':
            document.body.style.zoom = '1';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;

        case 'set_background':
            if (typeof value === 'string') {
                document.body.style.backgroundColor = value;
            }
            break;

        case 'set_text_color':
            if (typeof value === 'string') {
                document.body.style.color = value;
            }
            break;

        default:
            console.log('🚫 Unhandled command:', command);
    }
}
