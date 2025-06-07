export type Expression =
    | 'neutral'
    | 'happy'
    | 'sad'
    | 'angry'
    | 'surprised';

export type Gesture =
    | 'none'
    | 'hand_up'
    | 'wave'
    | 'fist'
    | 'open_palm'
    | 'swipe_left'
    | 'swipe_right';

export type BrightnessLevel = 'low' | 'medium' | 'high';

export interface CameraState {
    isCameraOn: boolean;
    expression: string;
    gesture: 'none' | 'open_palm';
    brightnessLevel: string;
    faceDirection: 'left' | 'right' | 'up' | 'down' | 'center';
    headTilt: number;
    landmarks: { x: number; y: number; z: number }[];
    handLandmarks: { x: number; y: number; z: number }[][];
    stream: MediaStream | null;
}

export interface UseCameraOptions {
    onGestureDetected?: (gesture: Gesture) => void;
    onExpressionChange?: (expression: Expression) => void;
}
