"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function EchoesOfTheCarts() {
    const [step, setStep] = useState(-1);
    const [flashIn, setFlashIn] = useState(true);
    const [windAudio, setWindAudio] = useState(null); // State for background audio

    const dialogue = [
        {
            character: "Ello",
            text: "Those carts gave me a voice—you can’t silence it now!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "step",
        },
        {
            character: "Sal",
            text: "A whisper against my roar—carts don’t topple thrones!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "lean",
        },
        {
            character: "Ello",
            text: "They carried hope—louder than your iron screams!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Sal",
            text: "Hope’s a frail shield—my steel will crush it flat!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Crush this then—my steel sings for Grok!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "firm",
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
            window.location.href = "/scenes/ellos-retribution";
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
