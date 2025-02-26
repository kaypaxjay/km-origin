"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import ChoiceButton from "../../../components/ChoiceButton";
import VaultPopup from "../../../components/VaultPopup";
import SaveNotice from "../../../components/SaveNotice";
import { saveGameStats } from "../../../lib/storage";
import "./styles.css";

export default function CoinVault() {
    const [step, setStep] = useState(-1);
    const [choiceMade, setChoiceMade] = useState(false);
    const [textOverlay, setTextOverlay] = useState(true);
    const [showVault, setShowVault] = useState(false);
    const [flashIn, setFlashIn] = useState(true);
    const [fadeOut, setFadeOut] = useState(false); // Single declaration here

    const dialogue = [
        {
            character: "Ello",
            text: "Take a look at this…",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "shift",
        },
        {
            character: "Ello",
            text: "A vault—drop a coin, it’s safe ‘til market’s end!",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "smile",
        },
        {
            character: "Sal",
            text: "Gods, Ello—a goldmine for every purse in the agora!",
            sprite: "/images/young-sal-sprite.png",
            sound: "/sounds/coin-jingle.mp3",
            animation: "bounce",
        },
        {
            character: "Ello",
            text: "Aye—farmers, fishers, no more empty hands!",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "step",
        },
        {
            character: "Sal",
            text: "We’ll flood the streets with coin—riches for all!",
            sprite: "/images/young-sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Let’s craft more—lift every soul in Grok!",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "bounce",
        },
    ];
    const choices = [
        {
            text: "Vaults for every home—wealth for all!",
            elloPoints: 1,
            salPoints: 0,
            machinaTrust: 0,
        }, // Ello’s mass uplift
        {
            text: "A vault to flood the empire—coin for Grok’s glory!",
            elloPoints: 0,
            salPoints: 1,
            machinaTrust: 1,
        }, // Sal’s grand ambition
    ];

    const handleNext = () => {
        if (step === 0 && !showVault) {
            setShowVault(true);
        } else if (step < dialogue.length - 1) {
            setStep((prevStep) => prevStep + 1);
        } else {
            setChoiceMade(true);
        }
    };

    const handleVaultClose = () => {
        setShowVault(false);
        setStep(1);
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
            window.location.href = "/scenes/battle-via-ferrum";
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

    return (
        <div
            className="scene-container"
            onClick={!choiceMade && !showVault && !textOverlay ? handleNext : null}
        >
            <img src="/images/agora.png" alt="Agora" className="background" />
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
                    {!showVault && !choiceMade && (
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
                    <p>Year 1030 - The Coin Vault</p>
                </div>
            )}
            {showVault && <VaultPopup image="/images/coin-vault.png" onClose={handleVaultClose} />}
            <SaveNotice />
        </div>
    );
}
