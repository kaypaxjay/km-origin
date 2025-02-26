"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function EllosRetribution() {
    const [flashIn, setFlashIn] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const handleClick = () => {
        if (!fadeOut) {
            setFadeOut(true);
            const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
            whooshAudio.volume = 0.8;
            whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
            setTimeout(() => {
                window.location.href = "/scenes/sals-rise";
            }, 500);
        }
    };

    useEffect(() => {
        const strikeAudio = new Audio("/sounds/sword-strike.mp3");
        strikeAudio.volume = 0.8;
        strikeAudio.play().catch(() => console.log("Strike audio failed—skipped"));

        const windAudio = new Audio("/sounds/wind-gust.mp3");
        windAudio.loop = true;
        windAudio.volume = 0.1;
        windAudio.play().catch(() => console.log("Wind audio failed—skipped"));

        setTimeout(() => {
            setFlashIn(false);
        }, 500);

        return () => {
            strikeAudio.pause();
            windAudio.pause();
        };
    }, []);

    return (
        <div className="scene-container" onClick={handleClick}>
            {!flashIn && (
                <>
                    <img
                        src="/images/ellos-retribution-image.png"
                        alt="Ello Strikes Sal"
                        className="strike"
                    />
                    <img
                        src="/images/sal-sprite.png"
                        alt="Sal"
                        className="sprite sal active flinch"
                    />
                    <DialogueBox character="Sal" text="Agh!" sound="/sounds/sal-scream.mp3" />
                </>
            )}
            {flashIn && <div className="flash-in" />}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
