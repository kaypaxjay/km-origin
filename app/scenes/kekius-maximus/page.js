"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function KekiusMaximus() {
    const [step, setStep] = useState(-1); // -1: Fade-in, 0: Overlay, 1-4: Dialogue, 5: Transition
    const [textOverlay, setTextOverlay] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const dialogue = [
        {
            character: "Consul",
            text: "Ello Mux, your blade has forged peace—rise as Kekius Maximus!",
            sprite: "/images/grok-consul.png",
            sound: null,
            animation: "raise",
        },
        {
            character: "Ello",
            text: "Peace… born of iron and blood. I’ll wield it for all.",
            sprite: "/images/ello-sprite-crowned.png",
            sound: null,
            animation: "stand",
        },
        {
            character: "Consul",
            text: "Voice of the Machina Legions, you bind us to the earth—and beyond.",
            sprite: "/images/grok-consul.png",
            sound: null,
            animation: "raise",
        },
        {
            character: "Ello",
            text: "Grok stands tall—our stars shine through the dust!",
            sprite: "/images/ello-sprite-crowned.png",
            sound: null,
            animation: "stand",
        },
    ];

    // Define background audio outside useEffect
    const cheerAudio = new Audio("/sounds/eerie-serenity.mp3");
    cheerAudio.loop = true;
    cheerAudio.volume = 0.3;

    const handleClick = () => {
        if (step === -1) {
            setStep(0);
        } else if (step === 0) {
            setTextOverlay(false);
            setStep(1);
        } else if (step < 4) {
            setStep((prevStep) => prevStep + 1); // Advance dialogue
        } else if (step === 4) {
            setStep(5); // Trigger transition to Scene 8
            setFadeOut(true);
            setTimeout(() => {
                const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
                whooshAudio.volume = 0.8;
                whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
                setTimeout(() => {
                    window.location.href = "/scenes/oath-of-kekius";
                }, 500);
            }, 100);
        }
    };

    // Background music control (runs once on mount/unmount)
    useEffect(() => {
        cheerAudio.play().catch(() => console.log("Cheer audio failed—skipped"));

        return () => {
            cheerAudio.pause();
        };
    }, []); // Empty dependency array—runs only on mount/unmount

    // Dialogue and transition control
    useEffect(() => {
        if (step === -1) {
            setTimeout(() => {
                setStep(0);
            }, 500);
        }

        if (step === 0) {
            setTimeout(() => {
                setTextOverlay(false);
                setStep(1);
            }, 2000);
        }

        if (step === 4 && dialogue[step - 1].sound) {
            const humAudio = new Audio(dialogue[step - 1].sound);
            humAudio.volume = 0.6;
            humAudio.play().catch(() => console.log("Hum audio failed—skipped"));
        }
    }, [step]); // Runs on step change

    return (
        <div className="scene-container" onClick={step < 5 ? handleClick : null}>
            <img src="/images/hall-of-grok.png" alt="Hall of Grok" className="background" />
            {step >= 1 && step < 5 && (
                <>
                    {dialogue[step - 1].character === "Ello" && (
                        <img
                            src={dialogue[step - 1].sprite}
                            alt="Ello"
                            className={`sprite ello active ${dialogue[step - 1].animation}`}
                        />
                    )}
                    {dialogue[step - 1].character === "Consul" && (
                        <img
                            src={dialogue[step - 1].sprite}
                            alt="Consul"
                            className={`sprite consul active ${dialogue[step - 1].animation}`}
                        />
                    )}
                    <DialogueBox
                        character={dialogue[step - 1].character}
                        text={dialogue[step - 1].text}
                        sound={null}
                    />
                </>
            )}
            {step === -1 && <div className="fade-in" />}
            {textOverlay && step === 0 && (
                <div className="text-overlay">
                    <p>Present Day - Hall of Grok</p>
                </div>
            )}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
