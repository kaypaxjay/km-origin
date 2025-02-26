"use client";

import { useState, useEffect } from "react";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function BattleSwordClash() {
    const [flashIn, setFlashIn] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [clashAudio, setClashAudio] = useState(null); // State for clash audio
    const [windAudio, setWindAudio] = useState(null); // State for background audio

    // Initialize Audio only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const clash = new Audio("/sounds/sword-clash.mp3");
            clash.volume = 0.8;
            setClashAudio(clash);

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
                window.location.href = "/scenes/coin-vault";
            }, 500);
        }
    };

    useEffect(() => {
        if (clashAudio && windAudio) {
            clashAudio.play().catch(() => console.log("Clash audio failed—skipped"));
            windAudio.play().catch(() => console.log("Wind audio failed—skipped"));
            setTimeout(() => {
                setFlashIn(false);
            }, 500);
        }

        return () => {
            if (clashAudio) clashAudio.pause();
            if (windAudio) windAudio.pause();
        };
    }, [clashAudio, windAudio]); // Runs when clashAudio and windAudio are set

    return (
        <div className="scene-container" onClick={handleClick}>
            {!flashIn && <img src="/images/clash-image.png" alt="Sword Clash" className="clash" />}
            {flashIn && <div className="flash-in" />}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
