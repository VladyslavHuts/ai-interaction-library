export function classifyEmotion(landmarks: any[]): string {
    const upperLip = landmarks[13];
    const lowerLip = landmarks[14];
    const mouthLeft = landmarks[61];
    const mouthRight = landmarks[291];
    const leftEyeTop = landmarks[159];
    const leftEyeBottom = landmarks[145];
    const rightEyeTop = landmarks[386];
    const rightEyeBottom = landmarks[374];
    const leftEyebrow = landmarks[70];
    const rightEyebrow = landmarks[300];

    const mouthOpen = Math.abs(upperLip.y - lowerLip.y);
    const eyeOpenLeft = Math.abs(leftEyeTop.y - leftEyeBottom.y);
    const eyeOpenRight = Math.abs(rightEyeTop.y - rightEyeBottom.y);
    const eyebrowsLift = (leftEyebrow.y + rightEyebrow.y) / 2;

    if (mouthOpen > 0.06 && eyeOpenLeft > 0.04 && eyeOpenRight > 0.04) {
        return 'surprised';
    } else if (mouthOpen < 0.02 && eyebrowsLift < 0.3) {
        return 'angry';
    } else if (mouthOpen < 0.02 && eyebrowsLift > 0.4) {
        return 'sad';
    } else if (mouthLeft.y < upperLip.y && mouthRight.y < upperLip.y) {
        return 'happy';
    } else {
        return 'neutral';
    }
}
