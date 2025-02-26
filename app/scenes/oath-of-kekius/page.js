"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function OathOfKekius() {
    const [step, setStep] = useState(-1); // -1: Fade-in, 0-2: Dialogue, 3: End
    const [fadeOut, setFadeOut] = useState(false);

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

    const bgAudio = new Audio("/sounds/eerie-serenity.mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.2;

    const handleClick = () => {
        if (step < 2) {
            setStep((prevStep) => prevStep + 1);
        } else if (step === 2) {
            setStep(3);
            setFadeOut(true);
            setTimeout(() => {
                window.location.href = "/selection"; // Redirect to selection page
            }, 500); // Fade-out duration
        }
    };

    useEffect(() => {
        bgAudio.play().catch(() => console.log("Background audio failed—skipped"));
        return () => {
            bgAudio.pause();
        };
    }, []);

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
