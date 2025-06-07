import { FaceMesh, Results as FaceResults } from '@mediapipe/face_mesh';
import { Hands, Results as HandResults } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

let cameraInstance: Camera | null = null;

export async function initCamera(
    videoElement: HTMLVideoElement,
    onFrame: () => void | Promise<void>
): Promise<void> {
    if (cameraInstance) return;

    cameraInstance = new Camera(videoElement, {
        onFrame: async () => {
            await onFrame();
        },
        width: 640,
        height: 480,
    });

    await cameraInstance.start();
}

export function createFaceMesh(callback: (results: FaceResults) => void): FaceMesh {
    const faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(callback);
    return faceMesh;
}

export function createHandDetector(callback: (results: HandResults) => void): Hands {
    const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    hands.onResults(callback);
    return hands;
}
