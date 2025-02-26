"use client";

import { useState, useEffect } from "react";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function BattleSwordClash() {
    const [flashIn, setFlashIn] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const handleClick = () => {
        if (!fadeOut) {
            setFadeOut(true);
            const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
            whooshAudio.volume = 0.8;
            whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
            setTimeout(() => {
                window.location.href = "/scenes/coin-vault";
            }, 500);
        }
    };

    useEffect(() => {
        const clashAudio = new Audio("/sounds/sword-clash.mp3");
        clashAudio.volume = 0.8;
        clashAudio.play().catch(() => console.log("Clash audio failed—skipped"));

        const windAudio = new Audio("/sounds/wind-gust.mp3");
        windAudio.loop = true;
        windAudio.volume = 0.1;
        windAudio.play().catch(() => console.log("Wind audio failed—skipped"));

        setTimeout(() => {
            setFlashIn(false);
        }, 500);

        return () => {
            clashAudio.pause();
            windAudio.pause();
        };
    }, []);

    return (
        <div className="scene-container" onClick={handleClick}>
            {!flashIn && <img src="/images/clash-image.png" alt="Sword Clash" className="clash" />}
            {flashIn && <div className="flash-in" />}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
