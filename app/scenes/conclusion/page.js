"use client";

import { useState, useEffect } from "react";
import "./styles.css";

export default function ConclusionSlides() {
    const [step, setStep] = useState(0); // 0: Slide, 1: Transition
    const [fadeOut, setFadeOut] = useState(false);

    const slide =
        "Sal, High Commander of the Open Order, has fallen. His death leaves the Order in chaos, granting fleeting peace to the Kingdom of Grok.";

    const handleClick = () => {
        if (step === 0) {
            setStep(1); // Trigger transition
            setFadeOut(true);
            setTimeout(() => {
                const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
                whooshAudio.volume = 0.8;
                whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
                setTimeout(() => {
                    window.location.href = "/scenes/kekius-maximus";
                }, 500); // Fade-out duration
            }, 100); // Slight delay for whoosh sync
        }
    };

    useEffect(() => {
        if (step === 0) {
            const timer = setTimeout(() => {
                handleClick(); // Trigger the same transition as clicking
            }, 5000); // 5 seconds

            return () => clearTimeout(timer); // Cleanup timer if component unmounts or step changes
        }
    }, [step]); // Run when step changes (only triggers at step 0)

    return (
        <div className="scene-container conclusion-slide" onClick={step === 0 ? handleClick : null}>
            {step === 0 && (
                <div className="slide-text">
                    <p>{slide}</p>
                </div>
            )}
            {fadeOut && <div className="fade-out" />}
        </div>
    );
}
