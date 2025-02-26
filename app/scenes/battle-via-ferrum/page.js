"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function BattleViaFerrum() {
    const [step, setStep] = useState(-1);
    const [textOverlay, setTextOverlay] = useState(true);

    const dialogue = [
        {
            character: "Sal",
            text: "That vault… our first spark, wasn’t it?",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "lean",
        },
        {
            character: "Ello",
            text: "Aye, when we dreamed as one—before your iron choked us.",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Sal",
            text: "Choked? I fanned sparks to flames—you nursed embers!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Embers warm homes—your flames raze them to ash!",
            sprite: "/images/ello-sprite.png",
            sound: null,
            animation: "strike",
        },
        {
            character: "Sal",
            text: "Let’s see your embers burn—Taste my steel!",
            sprite: "/images/sal-sprite.png",
            sound: null,
            animation: "strike",
        },
    ];

    const handleClick = () => {
        if (step < dialogue.length - 1) {
            setStep(step + 1);
        } else {
            window.location.href = "/scenes/sal-strike";
        }
    };

    useEffect(() => {
        const windAudio = new Audio("/sounds/wind-gust.mp3");
        windAudio.loop = true;
        windAudio.volume = 0.1;

        setTimeout(() => {
            setFlashIn(false);
            setTimeout(() => {
                setTextOverlay(false);
                setStep(0);
                windAudio.play().catch(() => console.log("Wind audio failed—skipped"));
            }, 2000);
        }, 500);

        return () => {
            windAudio.pause();
        };
    }, []);

    const [flashIn, setFlashIn] = useState(true);

    return (
        <div className="scene-container" onClick={!textOverlay ? handleClick : null}>
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
            {textOverlay && (
                <div className="text-overlay">
                    <p>Year 1050 - The Via Ferrum</p>
                </div>
            )}
            <SaveNotice />
        </div>
    );
}
