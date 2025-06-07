import React, { useRef, useEffect, useMemo } from 'react';
import { useCamera } from '../hooks/useCamera';
import { FACEMESH_TESSELATION } from '@mediapipe/face_mesh';

type Point3D = { x: number; y: number; z: number };

// Стандартні звʼязки між точками кисті
const HAND_CONNECTIONS: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
    [5, 6], [6, 7], [7, 8],               // Index
    [9, 10], [10, 11], [11, 12],          // Middle
    [13, 14], [14, 15], [15, 16],         // Ring
    [17, 18], [18, 19], [19, 20],         // Pinky
    [0, 5], [5, 9], [9, 13], [13, 17], [17, 0], // Palm outline
    [0, 9], [5, 17], [5, 13], [0, 13]     // Cross links
];

function isPoint3DArray(input: unknown): input is Point3D[] {
    return (
        Array.isArray(input) &&
        input.length > 0 &&
        typeof input[0] === 'object' &&
        input[0] !== null &&
        'x' in input[0] &&
        'y' in input[0] &&
        'z' in input[0]
    );
}

const CameraComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const {
        stream,
        landmarks,
        handLandmarks,
        expression,
        gesture,
        brightnessLevel,
        faceDirection,
        headTilt,
    } = useCamera({
        onGestureDetected: () => {},
        onExpressionChange: () => {},
    });

    const unifiedHandLandmarks: Point3D[][] = useMemo(() => {
        if (!handLandmarks || handLandmarks.length === 0) return [];
        if (isPoint3DArray(handLandmarks)) {
            return [handLandmarks];
        }
        return handLandmarks as unknown as Point3D[][];
    }, [handLandmarks]);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const video = videoRef.current;

        let frameId: number;

        const draw = () => {
            if (!canvas || !ctx || !video) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // FACE
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 0.5;
            FACEMESH_TESSELATION.forEach(([i, j]) => {
                const p1 = landmarks[i];
                const p2 = landmarks[j];
                if (p1 && p2) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
                    ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
                    ctx.stroke();
                }
            });

            // HANDS
            unifiedHandLandmarks.forEach((hand) => {
                // Draw points
                ctx.fillStyle = 'red';
                hand.forEach((p) => {
                    ctx.beginPath();
                    ctx.arc(p.x * canvas.width, p.y * canvas.height, 2, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Draw connections
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 1;
                HAND_CONNECTIONS.forEach(([start, end]) => {
                    const p1 = hand[start];
                    const p2 = hand[end];
                    if (p1 && p2) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
                        ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
                        ctx.stroke();
                    }
                });
            });

            frameId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(frameId);
    }, [landmarks, unifiedHandLandmarks]);

    return (
        <div className="camera">
            <div className="camera__video-wrapper" style={{ position: 'relative', width: 640, height: 480 }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: 'none',
                    }}
                />
                <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none',
                    }}
                />
            </div>

            <div className="camera__status">
                <div className="camera__status-item">Emotion: {expression}</div>
                <div className="camera__status-item">Gesture: {gesture}</div>
                <div className="camera__status-item">Lighting: {brightnessLevel}</div>
                <div className="camera__status-item">Face: {faceDirection}</div>
                <div className="camera__status-item">Tilt: {headTilt.toFixed(1)}°</div>
            </div>
        </div>
    );
};

export default CameraComponent;
