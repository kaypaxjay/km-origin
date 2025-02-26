"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function OathOfKekius() {
    const [step, setStep] = useState(-1); // -1: Fade-in, 0-2: Dialogue, 3: End
    const [fadeOut, setFadeOut] = useState(false);
    const [bgAudio, setBgAudio] = useState(null); // State for background audio

    const dialogue = [
        {
            character: "Ello",
            text: "I’m Kekius Maximus now—Grok’s strength lies in honest hands.",
            sprite: "/images/kekius-ello.png",
            sound: null,
            animation: "stand",
        },
        {
            character: "Ello",
            text: "No veils, no lords—just trust, from the fields to the skies.",
            sprite: "/images/kekius-ello.png",
            sound: null,
            animation: "stand",
        },
        {
            character: "Ello",
            text: "This is our end—and our rise.",
            sprite: "/images/kekius-ello.png",
            sound: null,
            animation: "stand",
        },
    ];

    // Initialize Audio only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const audio = new Audio("/sounds/eerie-serenity.mp3");
            audio.loop = true;
            audio.volume = 0.2;
            setBgAudio(audio);
        }
    }, []); // Runs once on mount

    const handleClick = () => {
        if (step < 2) {
            setStep((prevStep) => prevStep + 1);
        } else if (step === 2) {
            setStep(3);
            setFadeOut(true);
            setTimeout(() => {
                window.location.href = "/selection";
            }, 500);
        }
    };

    useEffect(() => {
        if (bgAudio) {
            bgAudio.play().catch(() => console.log("Background audio failed—skipped"));
        }
        return () => {
            if (bgAudio) bgAudio.pause();
        };
    }, [bgAudio]); // Runs when bgAudio is set

    useEffect(() => {
        if (step === -1) {
            setTimeout(() => {
                setStep(0);
            }, 500);
        }
    }, [step]);

    return (
        <div className="scene-container" onClick={step < 3 ? handleClick : null}>
            <img src="/images/kekius-maximus.png" alt="Grok Chamber" className="background" />
            {step >= 0 && step < 3 && (
                <>
                    <img
                        src={dialogue[step].sprite}
                        alt="Ello"
                        className={`sprite ello active ${dialogue[step].animation}`}
                    />
                    <DialogueBox
                        character={dialogue[step].character}
                        text={dialogue[step].text}
                        sound={null}
                    />
                </>
            )}
            {step === -1 && <div className="fade-in" />}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
