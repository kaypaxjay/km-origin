"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function ThronesAndShouts() {
    const [step, setStep] = useState(-1);
    const [flashIn, setFlashIn] = useState(true);
    const [windAudio, setWindAudio] = useState(null); // State for background audio

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
            window.location.href = "/scenes/the-final-blow";
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
            <SaveNotice />
        </div>
    );
}
