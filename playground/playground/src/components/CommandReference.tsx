import React from 'react';
import '../styles/components/command-reference.scss';

const commandData: Record<string, { examples: string[]; description: string }> = {
    zoom_in: {
        examples: ['zoom in', 'enlarge', 'make bigger'],
        description: 'Increase the size of an element or the interface'
    },
    zoom_out: {
        examples: ['zoom out', 'reduce', 'make smaller'],
        description: 'Decrease the size of an element or the interface'
    },
    scroll_down: {
        examples: ['scroll down', 'move down'],
        description: 'Scroll the page downward'
    },
    scroll_up: {
        examples: ['scroll up', 'move up'],
        description: 'Scroll the page upward'
    },
    scroll_left: {
        examples: ['scroll left', 'move left'],
        description: 'Scroll the page to the left'
    },
    scroll_right: {
        examples: ['scroll right', 'move right'],
        description: 'Scroll the page to the right'
    },
    next_page: {
        examples: ['next page', 'go next'],
        description: 'Navigate to the next page'
    },
    prev_page: {
        examples: ['previous page', 'go back'],
        description: 'Navigate to the previous page'
    },
    go_to: {
        examples: ['go to', 'open page'],
        description: 'Open a specific page by name'
    },
    reset: {
        examples: ['reset', 'go to default'],
        description: 'Reset the interface to its default state'
    },
    open_ui: {
        examples: ['open menu', 'open filter', 'open chat'],
        description: 'Open a specific UI section like menu or chat'
    },
    set_text_color: {
        examples: ['change text color'],
        description: 'Change the color of the text on the page'
    },
    set_font_family: {
        examples: ['change font to', 'set font'],
        description: 'Change the font family of the text'
    },
    set_font_size: {
        examples: ['change font size', 'make text bigger'],
        description: 'Adjust the size of the text'
    },
    play_video: {
        examples: ['play video', 'start video'],
        description: 'Start video playback'
    },
    stop_video: {
        examples: ['stop video', 'pause video'],
        description: 'Stop or pause video playback'
    },
    play_audio: {
        examples: ['play music', 'start audio'],
        description: 'Start playing audio or music'
    },
    stop_audio: {
        examples: ['stop music', 'mute audio'],
        description: 'Stop or mute audio playback'
    },
    zoom_image: {
        examples: ['zoom image', 'enlarge picture'],
        description: 'Zoom in on an image or picture'
    },
    volume_up: {
        examples: ['increase volume', 'volume up'],
        description: 'Increase the system or media volume'
    },
    volume_down: {
        examples: ['decrease volume', 'volume down'],
        description: 'Decrease the system or media volume'
    },
    seek_media: {
        examples: ['seek forward', 'rewind'],
        description: 'Move forward or backward within a media file'
    },
    infinite_scroll_down: {
        examples: ['scroll forever', 'auto scroll down'],
        description: 'Automatically scroll down continuously'
    },
    set_background: {
        examples: ['change background', 'background to'],
        description: 'Change the background color or image'
    },
    set_block_color: {
        examples: ['change all blocks', 'set block color'],
        description: 'Change the color of all UI blocks'
    }
};

const CommandReference: React.FC = () => {
    return (
        <div className="command-ref">
            <h2 className="command-ref__title">Available Voice Commands</h2>
            <div className="command-ref__table">
                {Object.entries(commandData).map(([key, value]) => (
                    <div key={key} className="command-ref__row">
                        <div className="command-ref__examples">
                            {value.examples.map((ex, i) => (
                                <code key={i} className="command-ref__code">{ex}</code>
                            ))}
                        </div>
                        <div className="command-ref__description">{value.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommandReference;
