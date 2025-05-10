declare module '@mediapipe/camera_utils' {
    export class Camera {
        constructor(videoElement: HTMLVideoElement, options: { onFrame: () => void, width?: number, height?: number });
        start(): void;
        stop(): void;
    }
}
