import React, { useRef, useEffect } from 'react';

interface Props {
    active: boolean;
}

const AudioVisualizer: React.FC<Props> = ({ active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        let animationId: number;

        const draw = (_?: number) => {
            if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#4caf50';
            ctx.beginPath();

            const sliceWidth = canvas.width / dataArrayRef.current.length;
            let x = 0;

            for (let i = 0; i < dataArrayRef.current.length; i++) {
                const v = dataArrayRef.current[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);

                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();

            animationId = requestAnimationFrame(draw);
        };

        const start = async () => {
            audioContextRef.current = new AudioContext();
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            sourceRef.current = audioContextRef.current.createMediaStreamSource(streamRef.current);

            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;

            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            sourceRef.current.connect(analyserRef.current);
            draw();
        };

        const stop = () => {
            if (audioContextRef.current) void audioContextRef.current.close();
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
            cancelAnimationFrame(animationId);
        };

        if (active) void start();
        else stop();

        return () => stop();
    }, [active]);

    return <canvas ref={canvasRef} width={500} height={100} className="voice-visualizer-canvas" />;
};

export default AudioVisualizer;
