"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import { checkGameStats } from "../../../lib/storage";
import "./styles.css";

export default function BattleOpening() {
    const [step, setStep] = useState(-1);
    const [textOverlay, setTextOverlay] = useState(true);
    const [windAudio, setWindAudio] = useState(null); // State for background audio

    const dialogue = [
        {
            character: "Ello",
            text: "This war’s your doing, Sal—your Open Order’s greed has bled Grok dry!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "strike",
        },
        {
            character: "Sal",
            text: "Greed? The Order built an empire—you’d bury it under Grok’s dirt!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Empire? You’ve razed villages—machina’s no tool for your crown!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Sal",
            text: "And your Kingdom shackles it—carts for peasants when we could rule the skies!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "lean",
        },
        {
            character: "Ello",
            text: "I fight for builders, not tyrants—you lost that dream, brother.",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "step",
        },
        {
            character: "Sal",
            text: "Brother? That died when you chose fear over fire—face me now!",
            sprite: "/images/sal-sprite.png",
            sound: "/sounds/sword-unsheath.mp3",
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
            window.location.href = "/scenes/sword-clash";
        }
        console.log("Clicked - Step:", step + 1);
    };

    useEffect(() => {
        checkGameStats();

        if (windAudio) {
            setTimeout(() => {
                setTextOverlay(false);
                setStep(0);
                windAudio.play().catch(() => console.log("Wind audio failed"));
            }, 2000);
        }

        return () => {
            if (windAudio) windAudio.pause();
        };
    }, [windAudio]); // Runs when windAudio is set

    return (
        <div className="scene-container" onClick={!textOverlay ? handleClick : null}>
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
            {textOverlay && (
                <div className="text-overlay">
                    <p>Year 1050 - The Tiber Verge</p>
                </div>
            )}
            <SaveNotice />
        </div>
    );
}
