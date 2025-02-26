"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function SalStrike() {
    const [flashIn, setFlashIn] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [strikeAudio, setStrikeAudio] = useState(null); // State for strike audio
    const [windAudio, setWindAudio] = useState(null); // State for background audio

    // Initialize Audio only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const strike = new Audio("/sounds/sword-strike.mp3");
            strike.volume = 0.8;
            setStrikeAudio(strike);

            const wind = new Audio("/sounds/wind-gust.mp3");
            wind.loop = true;
            wind.volume = 0.1;
            setWindAudio(wind);
        }
    }, []); // Runs once on mount

    const handleClick = () => {
        if (!fadeOut) {
            setFadeOut(true);
            if (typeof window !== "undefined") {
                const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
                whooshAudio.volume = 0.8;
                whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
            }
            setTimeout(() => {
                window.location.href = "/scenes/ellos-rise";
            }, 500);
        }
    };

    useEffect(() => {
        if (strikeAudio && windAudio) {
            strikeAudio.play().catch(() => console.log("Strike audio failed—skipped"));
            windAudio.play().catch(() => console.log("Wind audio failed—skipped"));
            setTimeout(() => {
                setFlashIn(false);
            }, 500);
        }

        return () => {
            if (strikeAudio) strikeAudio.pause();
            if (windAudio) windAudio.pause();
        };
    }, [strikeAudio, windAudio]); // Runs when strikeAudio and windAudio are set

    return (
        <div className="scene-container" onClick={handleClick}>
            {!flashIn && (
                <>
                    <img src="/images/strike-image.png" alt="Sal Strikes Ello" className="strike" />
                    <img
                        src="/images/ello-sprite.png"
                        alt="Ello"
                        className="sprite ello active flinch"
                    />
                    <DialogueBox character="Ello" text="Argh!" sound="/sounds/ello-shout.mp3" />
                </>
            )}
            {flashIn && <div className="flash-in" />}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
