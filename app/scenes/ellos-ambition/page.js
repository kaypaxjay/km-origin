"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import ChoiceButton from "../../../components/ChoiceButton";
import SaveNotice from "../../../components/SaveNotice";
import { saveGameStats } from "../../../lib/storage";
import "./styles.css";

export default function EllosAmbition() {
    const [step, setStep] = useState(-1);
    const [choiceMade, setChoiceMade] = useState(false);
    const [textOverlay, setTextOverlay] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const dialogue = [
        {
            character: "Ello",
            text: "The Caelum Galley—she’ll take us to the stars!",
            sprite: "/images/adult-ello-sprite.png",
            sound: null,
            animation: "shift",
        },
        {
            character: "Sal",
            text: "Stars? Ello, that’s wild—higher than my wildest!",
            sprite: "/images/adult-sal-sprite.png",
            sound: null,
            animation: "lean",
        },
        {
            character: "Ello",
            text: "Not just me—Grok’ll rise, every soul aboard!",
            sprite: "/images/adult-ello-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Sal",
            text: "Aboard? I’d lead from a tower—you outdream me again!",
            sprite: "/images/adult-sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Towers root—stars free us. Let’s lift them all!",
            sprite: "/images/adult-ello-sprite.png",
            sound: null,
            animation: "step",
        },
        {
            character: "Sal",
            text: "All’s a heavy load—I’d soar light and fast!",
            sprite: "/images/adult-sal-sprite.png",
            sound: null,
            animation: "bounce",
        },
    ];
    const choices = [
        { text: "A galley for all—stars for Grok!", elloPoints: 1, salPoints: 0, machinaTrust: 0 },
        {
            text: "Soar fast—lead Grok to the heavens!",
            elloPoints: 0,
            salPoints: 1,
            machinaTrust: 1,
        },
    ];

    const handleNext = () => {
        if (step < dialogue.length - 1) {
            setStep((prevStep) => prevStep + 1);
        } else {
            setChoiceMade(true);
        }
    };

    const handleChoice = (choice) => {
        const stats = JSON.parse(localStorage.getItem("gameStats")) || {
            elloPoints: 0,
            salPoints: 0,
            machinaTrust: 0,
        };
        stats.elloPoints += choice.elloPoints;
        stats.salPoints += choice.salPoints;
        stats.machinaTrust += choice.machinaTrust;
        saveGameStats(stats);

        setFadeOut(true);
        const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
        whooshAudio.volume = 0.8;
        whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
        setTimeout(() => {
            window.location.href = "/scenes/thrones-and-shouts";
        }, 500);
    };

    useEffect(() => {
        const ambienceAudio = new Audio("/sounds/gentle-waves.mp3");
        ambienceAudio.loop = true;
        ambienceAudio.volume = 0.3;

        setTimeout(() => {
            setFlashIn(false);
            setTimeout(() => {
                setTextOverlay(false);
                setStep(0);
                ambienceAudio.play().catch(() => console.log("Ambience audio failed—skipped"));
            }, 2000);
        }, 500);

        return () => {
            ambienceAudio.pause();
        };
    }, []);

    const [flashIn, setFlashIn] = useState(true);

    return (
        <div className="scene-container" onClick={!choiceMade && !textOverlay ? handleNext : null}>
            <img src="/images/cliffside-galley.png" alt="Caelum Galley" className="background" />
            {step >= 0 && (
                <>
                    {dialogue[step].character === "Ello" && (
                        <img
                            src="/images/adult-ello-sprite.png"
                            alt="Adult Ello"
                            className={`sprite ello active ${dialogue[step].animation}`}
                        />
                    )}
                    {dialogue[step].character === "Sal" && (
                        <img
                            src="/images/adult-sal-sprite.png"
                            alt="Adult Sal"
                            className={`sprite sal active ${dialogue[step].animation}`}
                        />
                    )}
                    {!choiceMade && (
                        <DialogueBox
                            character={dialogue[step].character}
                            text={dialogue[step].text}
                            sound={dialogue[step].sound}
                        />
                    )}
                    {choiceMade && (
                        <div className="choice-container">
                            {choices.map((choice, index) => (
                                <ChoiceButton
                                    key={index}
                                    text={choice.text}
                                    onClick={() => handleChoice(choice)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
            {flashIn && <div className="flash-in" />}
            {fadeOut && <div className="fade-out" />}
            {textOverlay && (
                <div className="text-overlay">
                    <p>Year 1045 - Ello’s Ambition</p>
                </div>
            )}
            <SaveNotice />
        </div>
    );
}
