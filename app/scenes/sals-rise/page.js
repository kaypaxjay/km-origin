"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import ChoiceButton from "../../../components/ChoiceButton";
import NexusPopup from "../../../components/NexusPopup"; // New component
import SaveNotice from "../../../components/SaveNotice";
import { saveGameStats } from "../../../lib/storage";
import "./styles.css";

export default function SalsRise() {
    const [step, setStep] = useState(-1);
    const [choiceMade, setChoiceMade] = useState(false);
    const [textOverlay, setTextOverlay] = useState(true);
    const [showNexus, setShowNexus] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const dialogue = [
        {
            character: "Sal",
            text: "The Nexus—traders linked, a web of gold!",
            sprite: "/images/young-sal-sprite.png",
            sound: "/sounds/static-effect.mp3",
            animation: "shift",
        },
        {
            character: "Ello",
            text: "Brilliant, Sal—it’ll hum through Grok!",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "bounce",
        },
        {
            character: "Sal",
            text: "Aye, and beyond—imagine the coin it’ll spin!",
            sprite: "/images/young-sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Beyond? For the village too—smiths, weavers, all hands!",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "step",
        },
        {
            character: "Sal",
            text: "Sure, but traders move fastest—coin’s the spark!",
            sprite: "/images/young-sal-sprite.png",
            sound: null,
            animation: "lean",
        },
    ];
    const choices = [
        { text: "A web for all—gold across Grok!", elloPoints: 1, salPoints: 0, machinaTrust: 0 },
        {
            text: "Spark the coin—traders lead the way!",
            elloPoints: 0,
            salPoints: 1,
            machinaTrust: 1,
        },
    ];

    const handleNext = () => {
        if (step === 0 && !showNexus) {
            setShowNexus(true); // Show Nexus popup after first line
        } else if (step < dialogue.length - 1) {
            setStep((prevStep) => prevStep + 1);
        } else {
            setChoiceMade(true);
        }
    };

    const handleNexusClose = () => {
        setShowNexus(false);
        setStep(1); // Move to next line after popup closes
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
            window.location.href = "/scenes/flames-of-the-nexus";
        }, 500);
    };

    useEffect(() => {
        const ambienceAudio = new Audio("/sounds/village-ambience.mp3");
        ambienceAudio.loop = true;
        ambienceAudio.volume = 0.1;

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
        <div
            className="scene-container"
            onClick={!choiceMade && !showNexus && !textOverlay ? handleNext : null}
        >
            <img src="/images/forum-nexus.png" alt="Forum Nexus" className="background" />
            {step >= 0 && (
                <>
                    {dialogue[step].character === "Ello" && (
                        <img
                            src="/images/young-ello-sprite.png"
                            alt="Young Ello"
                            className={`sprite ello active ${dialogue[step].animation}`}
                        />
                    )}
                    {dialogue[step].character === "Sal" && (
                        <img
                            src="/images/young-sal-sprite.png"
                            alt="Young Sal"
                            className={`sprite sal active ${dialogue[step].animation}`}
                        />
                    )}
                    {!showNexus && !choiceMade && (
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
                    <p>Year 1040 - Sal’s Rise</p>
                </div>
            )}
            {showNexus && <NexusPopup image="/images/nexus-image.png" onClose={handleNexusClose} />}
            <SaveNotice />
        </div>
    );
}
