import { useEffect, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

export interface FaceMeshResult {
    faceCount: number;
    status: 'ok' | 'no_face' | 'multiple_faces';
    warning?: 'partial_landmarks';
    landmarks: number[][];
}

export const useFaceMesh = (videoRef: React.RefObject<HTMLVideoElement>): FaceMeshResult => {
    const [faceCount, setFaceCount] = useState(0);
    const [landmarks, setLandmarks] = useState<number[][]>([]);
    const [status, setStatus] = useState<'ok' | 'no_face' | 'multiple_faces'>('no_face');
    const [warning, setWarning] = useState<FaceMeshResult['warning']>();

    useEffect(() => {
        if (!videoRef.current) return;

        const faceMesh = new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });

        faceMesh.setOptions({
            maxNumFaces: 2,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        faceMesh.onResults((results) => {
            const detections = results.multiFaceLandmarks;
            setFaceCount(detections.length);

            if (detections.length === 0) {
                setStatus('no_face');
            } else if (detections.length > 1) {
                setStatus('multiple_faces');
            } else {
                setStatus('ok');
            }

            if (detections.length >= 1) {
                setLandmarks(detections[0].map(p => [p.x, p.y, p.z]));
                if (detections[0].length < 468) setWarning('partial_landmarks');
                else setWarning(undefined);
            }
        });

        const camera = new Camera(videoRef.current, {
            onFrame: async () => await faceMesh.send({ image: videoRef.current! }),
            width: 640,
            height: 480
        });

        camera.start();

        return () => {
            camera.stop();
            faceMesh.close();
        };
    }, [videoRef]);

    return { faceCount, status, warning, landmarks };
};
