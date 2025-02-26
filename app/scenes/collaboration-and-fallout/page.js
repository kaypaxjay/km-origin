"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import ChoiceButton from "../../../components/ChoiceButton";
import SaveNotice from "../../../components/SaveNotice";
import { saveGameStats } from "../../../lib/storage";
import "./styles.css";

export default function CollaborationAndFallout() {
    const [step, setStep] = useState(-1); // -1: Fade-in, 0-7: Dialogue, 8: Choice, 9: Transition
    const [choiceMade, setChoiceMade] = useState(false);
    const [textOverlay, setTextOverlay] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const dialogue = [
        {
            character: "Ello",
            text: "Machina for all—we dreamed it safe, a tool for every hand.",
            sprite: "/images/adult-ello-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Sal",
            text: "Safe? It’s power—let it reign, let me lead!",
            sprite: "/images/adult-sal-sprite.png",
            sound: null,
            animation: "lean",
        },
        {
            character: "Ello",
            text: "Lead? We bound it to shield—our pact, not your throne!",
            sprite: "/images/adult-ello-sprite.png",
            sound: null,
            animation: "step",
        },
        {
            character: "Sal",
            text: "Shields rust—machina replace men, crown the bold!",
            sprite: "/images/adult-sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Replace us? That’s no dream—it’s a king’s cage!",
            sprite: "/images/adult-ello-sprite.png",
            sound: null,
            animation: "firm",
        },
        {
            character: "Sal",
            text: "Cages for the weak—I’ll rule through iron!",
            sprite: "/images/adult-sal-sprite.png",
            sound: null,
            animation: "firm",
        },
    ];
    const choices = [
        { text: "Bind it safe—for Grok’s hands!", elloPoints: 1, salPoints: 0 },
        { text: "Let it rule—iron over flesh!", elloPoints: 0, salPoints: 1 },
    ];

    // Define background audio outside useEffect
    const gearAudio = new Audio("/sounds/night-ambience.mp3");
    gearAudio.loop = true;
    gearAudio.volume = 0.2;

    const handleNext = () => {
        if (step < dialogue.length - 1) {
            setStep((prevStep) => prevStep + 1);
        } else {
            setChoiceMade(true);
            setStep(8); // Explicitly set to choice state
        }
    };

    const handleChoice = (choice) => {
        const stats = JSON.parse(localStorage.getItem("gameStats")) || {
            elloPoints: 0,
            salPoints: 0,
        };
        stats.elloPoints += choice.elloPoints;
        stats.salPoints += choice.salPoints;
        saveGameStats(stats);

        setFadeOut(true);
        setTimeout(() => {
            const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
            whooshAudio.volume = 0.8;
            whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
            setTimeout(() => {
                window.location.href = "/scenes/last-words";
            }, 500); // Fade duration
        }, 500); // Fade-out delay
    };

    // Background music control (runs once on mount/unmount)
    useEffect(() => {
        gearAudio.play().catch(() => console.log("Gear audio failed—skipped"));

        return () => {
            gearAudio.pause();
        };
    }, []); // Empty dependency array—runs only on mount/unmount

    // Dialogue and transition control
    useEffect(() => {
        if (step === -1) {
            setTimeout(() => {
                setStep(0);
                setTimeout(() => {
                    setTextOverlay(false);
                }, 2000); // Text overlay duration
            }, 500); // Fade-in duration
        }
    }, [step]); // Runs on step change

    return (
        <div
            className="scene-container"
            onClick={!choiceMade && !textOverlay && step < 8 ? handleNext : null}
        >
            <img src="/images/machina-tower.png" alt="Machina Tower" className="background" />
            {step >= 0 && step < 8 && (
                <>
                    {dialogue[step].character === "Ello" && (
                        <img
                            src={dialogue[step].sprite}
                            alt="Ello"
                            className={`sprite ello active ${dialogue[step].animation}`}
                        />
                    )}
                    {dialogue[step].character === "Sal" && (
                        <img
                            src={dialogue[step].sprite}
                            alt="Sal"
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
                </>
            )}
            {step >= 8 && choiceMade && !fadeOut && (
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
            {step === -1 && <div className="fade-in" />}
            {textOverlay && (
                <div className="text-overlay">
                    <p>Year 1050 - Collaboration & Fallout</p>
                </div>
            )}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
