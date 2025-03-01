"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function LastWords() {
    const [step, setStep] = useState(-1); // -1: Fade-in, 0-7: Dialogue, 8: Transition
    const [fadeOut, setFadeOut] = useState(false);
    const [windAudio, setWindAudio] = useState(null); // State for background audio

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
            animation: "stand",
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
            animation: "stand",
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

    // Initialize Audio only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const audio = new Audio("/sounds/sad-music.mp3");
            audio.loop = true;
            audio.volume = 0.2;
            setWindAudio(audio);
        }
    }, []); // Runs once on mount

    // Background music control
    useEffect(() => {
        if (windAudio) {
            windAudio.play().catch(() => console.log("Wind audio failed—skipped"));
        }
        return () => {
            if (windAudio) windAudio.pause();
        };
    }, [windAudio]); // Runs when windAudio is set

    const handleClick = () => {
        if (step < 7) {
            setStep((prevStep) => prevStep + 1);
        } else if (step === 7) {
            setStep(8);
            setFadeOut(true);
            setTimeout(() => {
                if (typeof window !== "undefined") {
                    const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
                    whooshAudio.volume = 0.8;
                    whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
                }
                setTimeout(() => {
                    window.location.href = "/scenes/conclusion";
                }, 500);
            }, 100);
        }
    };

    // Dialogue and transition control
    useEffect(() => {
        if (step === -1) {
            setTimeout(() => {
                setStep(0);
            }, 500);
        }

        if (step >= 0 && step < 8 && dialogue[step].sound) {
            if (typeof window !== "undefined") {
                const soundAudio = new Audio(dialogue[step].sound);
                soundAudio.volume = 0.8;
                soundAudio.play().catch(() => console.log("Sound audio failed—skipped"));
            }
        }
    }, [step]);

    return (
        <div className="scene-container" onClick={step < 8 ? handleClick : null}>
            <img src="/images/sal-end.png" alt="Sal's End" className="background" />
            {step >= 0 && step < 8 && (
                <>
                    <img
                        src={dialogue[step].sprite}
                        alt={dialogue[step].character}
                        className={`sprite ${dialogue[step].character.toLowerCase()} active ${
                            dialogue[step].animation
                        }`}
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
