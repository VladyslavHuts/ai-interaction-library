export type VoiceCommandType =
    | 'zoom_in'
    | 'zoom_out'
    | 'scroll_down'
    | 'scroll_up'
    | 'scroll_left'
    | 'scroll_right'
    | 'next_page'
    | 'prev_page'
    | 'go_to'
    | 'reset'
    | 'open_ui'
    | 'set_text_color'
    | 'set_font_family'
    | 'set_font_size'
    | 'play_video'
    | 'stop_video'
    | 'play_audio'
    | 'stop_audio'
    | 'zoom_image'
    | 'volume_up'
    | 'volume_down'
    | 'seek_media'
    | 'infinite_scroll_down'
    | 'set_background'
    | 'set_block_color';

export interface VoiceCommand {
    type: VoiceCommandType;
    value?: string | number;
    rawText: string;
}
