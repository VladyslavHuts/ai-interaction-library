import { useState, useEffect, useRef } from 'react'
import * as faceapi from 'face-api.js'

export interface CameraState {
    isCameraActive: boolean
    faceCount: number
    detectedEmotion: string
    confidence: number
    status: 'ok' | 'no_face' | 'multiple_faces'
    warning?: 'mask_detected' | 'glasses_detected' | 'partial_landmarks'
}

export const useCamera = (videoRef: React.RefObject<HTMLVideoElement | null>): CameraState => {
    const [isCameraActive, setIsCameraActive] = useState(true)
    const [faceCount, setFaceCount] = useState(0)
    const [detectedEmotion, setDetectedEmotion] = useState('neutral')
    const [confidence, setConfidence] = useState(0)
    const [status, setStatus] = useState<'ok' | 'no_face' | 'multiple_faces'>('no_face')
    const [warning, setWarning] = useState<CameraState['warning']>()

    const lastEmotionRef = useRef<string>('neutral')
    const sameEmotionCountRef = useRef<number>(0)
    const threshold = 2 // мінімум 2 однакових підряд, щоб оновити емоцію

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ])
        }
        loadModels().catch(err => console.error('Error loading models', err))

        const detect = async () => {
            if (videoRef.current && faceapi.nets.tinyFaceDetector.params) {
                const detections = await faceapi.detectAllFaces(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                ).withFaceLandmarks().withFaceExpressions()

                setFaceCount(detections.length)

                if (detections.length === 0) {
                    setStatus('no_face')
                    setDetectedEmotion('neutral')
                    setConfidence(0)
                } else if (detections.length > 1) {
                    setStatus('multiple_faces')
                    setDetectedEmotion('neutral')
                    setConfidence(0)
                } else {
                    setStatus('ok')
                    const expressions = detections[0].expressions

                    const entries = Object.entries(expressions) as [string, number][]
                    const [bestEmotion, bestConfidence] = entries.reduce((prev, curr) =>
                        curr[1] > prev[1] ? curr : prev
                    )

                    if (bestEmotion === lastEmotionRef.current) {
                        sameEmotionCountRef.current += 1
                        if (sameEmotionCountRef.current >= threshold) {
                            setDetectedEmotion(bestEmotion)
                            setConfidence(bestConfidence)
                        }
                    } else {
                        sameEmotionCountRef.current = 1
                        lastEmotionRef.current = bestEmotion
                    }

                    // Симуляція виявлення аксесуарів
                    const random = Math.random()
                    if (random < 0.1) setWarning('mask_detected')
                    else if (random < 0.2) setWarning('glasses_detected')
                    else setWarning(undefined)
                }
            }
        }

        const intervalId = window.setInterval(detect, 1000)

        return () => window.clearInterval(intervalId)
    }, [videoRef])

    return {
        isCameraActive,
        faceCount,
        detectedEmotion,
        confidence,
        status,
        warning
    }
}
