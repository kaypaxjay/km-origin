"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function ThronesAndShouts() {
    const [step, setStep] = useState(-1);

    const dialogue = [
        {
            character: "Sal",
            text: "That galley—gave you wings to shout, didn’t it?",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "lean",
        },
        {
            character: "Ello",
            text: "Wings I forged—while you chained Grok to thrones!",
            sprite: "/images/ello-sprite.png",
            sound: "/sounds/sword-strike.mp3",
            animation: "strike",
        },
        {
            character: "Sal",
            text: "Thrones lift—machina rule men, not flap in mud!",
            sprite: "/images/sal-sprite.png",
            sound: "/sounds/sword-impact.mp3",
            animation: "flinch",
        },
        {
            character: "Ello",
            text: "Mud’s our root—stars our rise—your reign’s dust!",
            sprite: "/images/ello-sprite.png",
            sound: "/sounds/sword-strike.mp3",
            animation: "strike",
        },
        {
            character: "Sal",
            text: "Dust bows—my iron’ll crown me yet!",
            sprite: "/images/sal-sprite.png",
            sound: "/sounds/sword-slash.mp3",
            animation: "wave",
        },
    ];

    const handleClick = () => {
        if (step < dialogue.length - 1) {
            setStep(step + 1);
        } else {
            window.location.href = "/scenes/the-final-blow"; // Direct to Scene 1h
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
            <SaveNotice />
        </div>
    );
}
