export type EmotionType = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised' | 'disgusted'

export interface CameraData {
    emotion: EmotionType
    lightLevel: number // 0 - 100
    gesture: 'none' | 'wave' | 'thumbs_up' | 'scroll' | string
    isCameraActive: boolean
}

export interface VoiceData {
    command: string
    isListening: boolean
}

export type ThemeMode = 'light' | 'dark' | 'high-contrast'

export interface UISettings {
    fontSize: 'small' | 'medium' | 'large'
    theme: ThemeMode
    colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
}
