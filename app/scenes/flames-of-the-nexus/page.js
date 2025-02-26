"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function FlamesOfTheNexus() {
    const [step, setStep] = useState(-1);
    const [fadeOut, setFadeOut] = useState(false);
    const [flashIn, setFlashIn] = useState(true);
    const [windAudio, setWindAudio] = useState(null); // State for background audio

    const dialogue = [
        {
            character: "Sal",
            text: "The Nexus was my fire—burned brighter than your little carts!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "lean",
        },
        {
            character: "Ello",
            text: "Till you fed it to the rich—when did you turn, Sal?",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Sal",
            text: "Turn? I grew—saw machina could crown me over men!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Crown you? We built for hands, not thrones!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "step",
        },
        {
            character: "Sal",
            text: "Hands tire—machina reign. Weakness breaks; I forge!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Ello",
            text: "Forge alone then—Grok stands with its people!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "strike",
        },
    ];

    // Initialize Audio only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const audio = new Audio("/sounds/wind-gust.mp3");
            audio.loop = true;
            audio.volume = 0.1;
            setWindAudio(audio);
        }
    }, []); // Runs once on mount

    const handleClick = () => {
        if (step < dialogue.length - 1) {
            setStep(step + 1);
        } else {
            setFadeOut(true);
            if (typeof window !== "undefined") {
                const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
                whooshAudio.volume = 0.8;
                whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
            }
            setTimeout(() => {
                window.location.href = "/scenes/ellos-ambition";
            }, 500);
        }
    };

    useEffect(() => {
        if (windAudio) {
            setTimeout(() => {
                setFlashIn(false);
                setStep(0);
                windAudio.play().catch(() => console.log("Wind audio failed—skipped"));
            }, 500);
        }

        return () => {
            if (windAudio) windAudio.pause();
        };
    }, [windAudio]); // Runs when windAudio is set

    return (
        <div className="scene-container" onClick={handleClick}>
            <img src="/images/battlefield.png" alt="Tiber Verge" className="background" />
            {step >= 0 && (
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
                        sound={dialogue[step].sound}
                    />
                </>
            )}
            {flashIn && <div className="flash-in" />}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
