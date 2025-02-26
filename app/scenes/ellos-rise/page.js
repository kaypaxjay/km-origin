"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import ChoiceButton from "../../../components/ChoiceButton";
import CartPopup from "../../../components/CartPopup"; // Correct component
import SaveNotice from "../../../components/SaveNotice";
import { saveGameStats } from "../../../lib/storage";
import "./styles.css";

export default function EllosRise() {
    const [step, setStep] = useState(-1);
    const [choiceMade, setChoiceMade] = useState(false);
    const [textOverlay, setTextOverlay] = useState(true);
    const [showCart, setShowCart] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const dialogue = [
        {
            character: "Ello",
            text: "Look—these carts roll free, no ox to pull!",
            sprite: "/images/young-ello-sprite.png",
            sound: "/sounds/cart-rattle.mp3",
            animation: "shift",
        },
        {
            character: "Sal",
            text: "Rolling miracles! The village’ll fly on these!",
            sprite: "/images/young-sal-sprite.png",
            sound: null,
            animation: "bounce",
        },
        {
            character: "Ello",
            text: "Aye—no more yokes, just ease for every back!",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "smile",
        },
        {
            character: "Sal",
            text: "We’ll race the winds—Grok’ll never walk again!",
            sprite: "/images/young-sal-sprite.png",
            sound: null,
            animation: "wave",
        },
        {
            character: "Ello",
            text: "Let’s build a fleet—freedom for every hand!",
            sprite: "/images/young-ello-sprite.png",
            sound: null,
            animation: "step",
        },
    ];
    const choices = [
        {
            text: "Carts for every field—rest for all!",
            elloPoints: 1,
            salPoints: 0,
            machinaTrust: 0,
        },
        {
            text: "A fleet to race the skies—speed for Grok!",
            elloPoints: 0,
            salPoints: 1,
            machinaTrust: 1,
        },
    ];

    const handleNext = () => {
        if (step === 0 && !showCart) {
            setShowCart(true); // Show cart popup after first line
        } else if (step < dialogue.length - 1) {
            setStep((prevStep) => prevStep + 1);
        } else {
            setChoiceMade(true);
        }
    };

    const handleCartClose = () => {
        setShowCart(false);
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
            window.location.href = "/scenes/echoes-of-the-carts";
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
            onClick={!choiceMade && !showCart && !textOverlay ? handleNext : null}
        >
            <img src="/images/agora.png" alt="Agora with Carts" className="background" />
            {step >= 0 && (
                <>
                    <img
                        src={dialogue[step].sprite}
                        alt={dialogue[step].character}
                        className={`sprite ${dialogue[step].character.toLowerCase()} active ${
                            dialogue[step].animation
                        }`}
                    />
                    {!showCart && !choiceMade && (
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
                    <p>Year 1035 - Ello’s Rise</p>
                </div>
            )}
            {showCart && <CartPopup image="/images/machina-cart.png" onClose={handleCartClose} />}
            <SaveNotice />
        </div>
    );
}
