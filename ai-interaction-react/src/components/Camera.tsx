import React, { useEffect, useRef, useState } from 'react';
import '@mediapipe/face_mesh';
import * as faceMeshModule from '@mediapipe/face_mesh';
import * as drawingUtils from '../utils/drawingUtils';
import { classifyEmotion } from '../utils/emotionClassifier';

export const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [emotion, setEmotion] = useState<string>('...');
    const recentEmotions = useRef<string[]>([]);
    const [faceCount, setFaceCount] = useState<number>(0);
    const [accessories, setAccessories] = useState<string>('None');
    const [status, setStatus] = useState<string>('Initializing...');

    useEffect(() => {
        const setupFaceMesh = async () => {
            if (!videoRef.current || !canvasRef.current) {
                console.warn('Video or canvas not ready yet');
                return;
            }

            const faceMesh = new faceMeshModule.FaceMesh({
                locateFile: (file) =>
                    `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
            });

            faceMesh.setOptions({
                maxNumFaces: 3,
                refineLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });

            faceMesh.onResults((results) => {
                const canvas = canvasRef.current;
                if (!canvas) {
                    console.warn('Canvas not available');
                    return;
                }

                const canvasCtx = canvas.getContext('2d');
                if (!canvasCtx) {
                    console.warn('Canvas context not available');
                    return;
                }

                const faces = results.multiFaceLandmarks;

                canvasCtx.save();
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

                if (!faces || faces.length === 0) {
                    setStatus('No face detected');
                    setFaceCount(0);
                    setAccessories('None');
                    setEmotion('...');
                } else {
                    setStatus('Face detected');
                    setFaceCount(faces.length);

                    const faceAccessories: string[] = [];

                    for (const landmarks of faces) {
                        drawingUtils.drawConnectors(
                            canvasCtx,
                            landmarks,
                            faceMeshModule.FACEMESH_TESSELATION,
                            { color: '#C0C0C070', lineWidth: 1 }
                        );
                        drawingUtils.drawLandmarks(
                            canvasCtx,
                            landmarks,
                            { color: '#FF3030', lineWidth: 2 }
                        );

                        const predictedEmotion = classifyEmotion(landmarks);

                        // Collect last 5 results
                        recentEmotions.current.push(predictedEmotion);
                        if (recentEmotions.current.length > 5) {
                            recentEmotions.current.shift();
                        }

                        // Find most common
                        const freqMap: Record<string, number> = {};
                        for (const emo of recentEmotions.current) {
                            freqMap[emo] = (freqMap[emo] || 0) + 1;
                        }
                        const mostCommonEmotion = Object.entries(freqMap).sort(
                            (a, b) => b[1] - a[1]
                        )[0][0];

                        setEmotion(mostCommonEmotion);

                        const eyeWidthLeft = Math.abs(landmarks[33].x - landmarks[133].x);
                        const eyeWidthRight = Math.abs(landmarks[362].x - landmarks[263].x);

                        if (eyeWidthLeft < 0.015 && eyeWidthRight < 0.015) {
                            faceAccessories.push('Glasses');
                        }

                        // Accessory checks
                        const upperLip = landmarks[13];
                        const lowerLip = landmarks[14];
                        const noseTip = landmarks[1];
                        const leftEyeTop = landmarks[159];
                        const leftEyeBottom = landmarks[145];
                        const rightEyeTop = landmarks[386];
                        const rightEyeBottom = landmarks[374];

                        const mouthOpen = Math.abs(upperLip.y - lowerLip.y);
                        const noseVisible = noseTip && noseTip.x && noseTip.y;
                        const eyeOpenLeft = Math.abs(leftEyeTop.y - leftEyeBottom.y);
                        const eyeOpenRight = Math.abs(rightEyeTop.y - rightEyeBottom.y);

                        if (mouthOpen < 0.01 && !noseVisible) {
                            faceAccessories.push('Mask');
                        }

                        if (eyeOpenLeft < 0.01 && eyeOpenRight < 0.01) {
                            faceAccessories.push('Glasses');
                        }
                    }

                    setAccessories(faceAccessories.length > 0 ? faceAccessories.join(', ') : 'None');
                }

                canvasCtx.restore();
            });

            // @ts-ignore
            const camera = new window.Camera(videoRef.current, {
                onFrame: async () => {
                    if (videoRef.current) {
                        await faceMesh.send({ image: videoRef.current });
                    }
                },
                width: 640,
                height: 480,
            });

            camera.start();

            return () => {
                camera.stop();
            };
        };

        setupFaceMesh();
    }, []);

    return (
        <div>
            <video ref={videoRef} style={{ visibility: 'hidden', position: 'absolute' }} width={640} height={480} />
            <canvas ref={canvasRef} width={640} height={480} />
            <p>Status: {status}</p>
            <p>Faces detected: {faceCount}</p>
            <p>Accessories: {accessories}</p>
            <p>Detected emotion: {emotion}</p>
        </div>
    );
};

export default Camera;
