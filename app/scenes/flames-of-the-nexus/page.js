"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function FlamesOfTheNexus() {
    const [step, setStep] = useState(-1);
    const [fadeOut, setFadeOut] = useState(false);

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

    const handleClick = () => {
        if (step < dialogue.length - 1) {
            setStep(step + 1);
        } else {
            setFadeOut(true);
            const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
            whooshAudio.volume = 0.8;
            whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
            setTimeout(() => {
                window.location.href = "/scenes/ellos-ambition";
            }, 500);
        }
    };

    useEffect(() => {
        const windAudio = new Audio("/sounds/wind-gust.mp3");
        windAudio.loop = true;
        windAudio.volume = 0.3;

        setTimeout(() => {
            setFlashIn(false);
            setStep(0); // Auto-start dialogue
            windAudio.play().catch(() => console.log("Wind audio failed—skipped"));
        }, 500);

        return () => {
            windAudio.pause();
        };
    }, []);

    const [flashIn, setFlashIn] = useState(true);

    return (
        <div className="scene-container" onClick={handleClick}>
            <img src="/images/battlefield.png" alt="Tiber Verge" className="background" />
            {step >= 0 && (
                <>
                    {dialogue[step].character === "Ello" && (
                        <img
                            src="/images/ello-sprite.png"
                            alt="Ello"
                            className={`sprite ello active ${dialogue[step].animation}`}
                        />
                    )}
                    {dialogue[step].character === "Sal" && (
                        <img
                            src="/images/sal-sprite.png"
                            alt="Sal"
                            className={`sprite sal active ${dialogue[step].animation}`}
                        />
                    )}
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
