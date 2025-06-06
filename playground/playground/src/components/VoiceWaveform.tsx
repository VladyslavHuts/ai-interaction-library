import React, { useRef, useEffect } from 'react';

const VoiceWaveform: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 80;
        canvas.height = 40;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i++) {
                const y = Math.sin(i * 0.1 + Date.now() / 100) * 10 + 20;
                ctx.lineTo(i, y);
            }
            ctx.strokeStyle = '#3aaaff';
            ctx.stroke();
            requestAnimationFrame(draw);
        };

        draw();
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default VoiceWaveform;
