"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function LastWords() {
    const [step, setStep] = useState(-1); // -1: Fade-in, 0-7: Dialogue, 8: Transition
    const [fadeOut, setFadeOut] = useState(false);

    const dialogue = [
        {
            character: "Ello",
            text: "It’s over, Sal—your iron crown’s dust!",
            sprite: "/images/ello-sprite.png",
            sound: "/sounds/sword-impact.mp3",
            animation: "strike",
        },
        {
            character: "Sal",
            text: "Ello… those coins… those stars… we were kids…",
            sprite: "/images/sal-injured.png",
            sound: null,
            animation: "fall",
        },
        {
            character: "Ello",
            text: "Aye, Sal. What made you climb so high?",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "stand",
        },
        {
            character: "Sal",
            text: "I saw it… a world lifted by machina… not scrabbling in dirt…",
            sprite: "/images/sal-injured.png",
            sound: null,
            animation: "fall",
        },
        {
            character: "Ello",
            text: "Lifted? You built a throne on their backs!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "stand",
        },
        {
            character: "Sal",
            text: "No… to pull them up… but only the strong could lead…",
            sprite: "/images/sal-injured.png",
            sound: null,
            animation: "fall",
        },
        {
            character: "Ello",
            text: "Strong like you? Leaving the weak to rot?",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "stand",
        },
        {
            character: "Sal",
            text: "To see farther… they’d climb too… in time…",
            sprite: "/images/sal-injured.png",
            sound: null,
            animation: "fade",
        },
    ];

    // Define background audio outside useEffect
    const windAudio = new Audio("/sounds/sad-music.mp3");
    windAudio.loop = true;
    windAudio.volume = 0.2;

    const handleClick = () => {
        if (step < 7) {
            setStep((prevStep) => prevStep + 1);
        } else if (step === 7) {
            setStep(8);
            setFadeOut(true);
            setTimeout(() => {
                const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
                whooshAudio.volume = 0.8;
                whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
                setTimeout(() => {
                    window.location.href = "/scenes/conclusion"; // Redirect to Scene 1j
                }, 500);
            }, 100);
        }
    };

    // Background music control (runs once on mount/unmount)
    useEffect(() => {
        windAudio.play().catch(() => console.log("Wind audio failed—skipped"));

        return () => {
            windAudio.pause();
        };
    }, []); // Empty dependency array—runs only on mount/unmount

    // Dialogue and transition control
    useEffect(() => {
        if (step === -1) {
            setTimeout(() => {
                setStep(0);
            }, 500);
        }

        if (step >= 0 && step < 8 && dialogue[step].sound) {
            const soundAudio = new Audio(dialogue[step].sound);
            soundAudio.volume = 0.8; // Only sword-impact remains
            soundAudio.play().catch(() => console.log("Sound audio failed—skipped"));
        }
    }, [step]); // Runs on step change

    return (
        <div className="scene-container" onClick={step < 8 ? handleClick : null}>
            <img src="/images/sal-end.png" alt="Sal's End" className="background" />
            {step >= 0 && step < 8 && (
                <>
                    {dialogue[step].character === "Ello" && (
                        <img
                            src={dialogue[step].sprite}
                            alt="Ello"
                            className={`sprite ello active ${dialogue[step].animation}`}
                        />
                    )}
                    {dialogue[step].character === "Sal" && (
                        <img
                            src={dialogue[step].sprite}
                            alt="Sal"
                            className={`sprite sal active ${dialogue[step].animation}`}
                        />
                    )}
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
