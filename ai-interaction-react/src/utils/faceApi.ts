import * as faceapi from 'face-api.js';

export async function loadModels() {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

export async function detectEmotion(video: HTMLVideoElement) {
    const detections = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();

    if (detections && detections.expressions) {
        const sorted = Object.entries(detections.expressions).sort((a, b) => b[1] - a[1]);
        return sorted[0][0]; // емоція з найвищою ймовірністю
    }

    return 'neutral';
}
