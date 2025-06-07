import { useEffect, useRef, useState } from 'react';
import { CameraState, UseCameraOptions } from '../types/camera.types';
import { initCamera, createFaceMesh, createHandDetector } from '../utils/cameraUtils';

export const useCamera = (options?: UseCameraOptions): CameraState => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [state, setState] = useState<CameraState>({
        isCameraOn: false,
        expression: 'neutral',
        gesture: 'none',
        brightnessLevel: 'medium',
        faceDirection: 'center',
        headTilt: 0,
        landmarks: [],
        handLandmarks: [], // тепер масив масивів (2 руки)
        stream: null,
    });

    useEffect(() => {
        const setup = async () => {
            const video = document.createElement('video');
            videoRef.current = video;

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            await video.play();

            const faceMesh = createFaceMesh((results) => {
                const landmarks = results.multiFaceLandmarks?.[0] || [];

                setState((prev) => ({
                    ...prev,
                    landmarks,
                }));

                if (options?.onExpressionChange) {
                    options.onExpressionChange('neutral'); // Підстав реальну логіку при потребі
                }
            });

            const hands = createHandDetector((results) => {
                const handLandmarks = results.multiHandLandmarks || []; // тепер всі руки
                const gesture = handLandmarks.length > 0 ? 'open_palm' : 'none';

                setState((prev) => ({
                    ...prev,
                    handLandmarks,
                    gesture,
                }));

                if (handLandmarks.length > 0 && options?.onGestureDetected) {
                    options.onGestureDetected(gesture);
                }
            });

            // 👇 Обовʼязково передаємо maxNumHands = 2
            hands.setOptions?.({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.6,
                minTrackingConfidence: 0.6,
            });

            await initCamera(video, async () => {
                await faceMesh.send({ image: video });
                await hands.send({ image: video });
            });

            setState((prev) => ({
                ...prev,
                isCameraOn: true,
                stream,
            }));
        };

        setup();

        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    return state;
};
