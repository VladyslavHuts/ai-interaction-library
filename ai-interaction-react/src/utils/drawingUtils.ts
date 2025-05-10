export function drawConnectors(ctx: CanvasRenderingContext2D, landmarks: any[], connections: any[], style: any) {
    const { color = '#00FF00', lineWidth = 1 } = style || {};
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    connections.forEach(([startIdx, endIdx]) => {
        const start = landmarks[startIdx];
        const end = landmarks[endIdx];
        if (start && end) {
            ctx.beginPath();
            ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
            ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
            ctx.stroke();
        }
    });
}

export function drawLandmarks(ctx: CanvasRenderingContext2D, landmarks: any[], style: any) {
    const { color = '#FF0000', radius = 1.5 } = style || {};
    ctx.fillStyle = color;
    landmarks.forEach((landmark) => {
        ctx.beginPath();
        ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, radius, 0, 2 * Math.PI);
        ctx.fill();
    });
}
