"use client";

import { useState, useEffect } from "react";
import DialogueBox from "../../../components/DialogueBox";
import SaveNotice from "../../../components/SaveNotice";
import "./styles.css";

export default function TheFinalBlow() {
    const [step, setStep] = useState(-1); // -1: Flash, 0: Panel 1, 1: Panel 2, 2: Panel 3, 3: Shout, 4: Transition
    const [revealedPanels, setRevealedPanels] = useState([false, false, false]);
    const [redFlash, setRedFlash] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const dialogue = [
        {
            character: "Ello",
            text: "You’ve forsaken the path we swore to tread!",
            sprite: "/images/ello-sprite.png",
            sound: "/sounds/sword-slash.mp3",
            animation: "strike",
        },
        {
            character: "Sal",
            text: "We could’ve crowned the world in iron!",
            sprite: "/images/sal-sprite.png",
            sound: "/sounds/sword-clash.mp3",
            animation: "strike",
        },
        {
            character: "Ello",
            text: "A king who does not protect his people is no king at all!",
            sprite: "/images/ello-sprite.png",
            sound: "/sounds/sword-impact.mp3",
            animation: "strike",
        },
        {
            character: "Both",
            text: "For the Iron Crown!",
            spriteEllo: "/images/ello-sprite.png",
            spriteSal: "/images/sal-sprite.png",
            sound: null,
            animation: "firm",
        },
    ];

    const panels = [
        { image: "/images/panel-1.png" }, // Clash
        { image: "/images/panel-2.png" }, // Swing
        { image: "/images/panel-3.png" }, // Lock
    ];

    const handleClick = () => {
        if (step < 2) {
            const newRevealed = [...revealedPanels];
            newRevealed[step + 1] = true; // Reveal next panel
            setRevealedPanels(newRevealed);
            setStep(step + 1); // Move to next panel
        } else if (step === 2) {
            setStep(3); // Move to collective shout
        } else if (step === 3) {
            setStep(4); // Trigger sword sound, red flash, and immediate black transition
            const swordAudio = new Audio("/sounds/sword-clash.mp3");
            swordAudio.volume = 0.8;
            swordAudio.play().catch(() => console.log("Sword audio failed—skipped"));
            setRedFlash(true); // Start red flash
            setFadeOut(true); // Immediate black fade-out
            setTimeout(() => {
                const whooshAudio = new Audio("/sounds/flash-whoosh.mp3");
                whooshAudio.volume = 0.8;
                whooshAudio.play().catch(() => console.log("Whoosh audio failed—skipped"));
                setTimeout(() => {
                    window.location.href = "/scenes/collaboration-and-fallout";
                }, 500); // Black fade-out duration
            }, 100); // Slight delay for whoosh to sync with fade
        }
    };

    useEffect(() => {
        const windAudio = new Audio("/sounds/wind-gust.mp3");
        windAudio.loop = true;
        windAudio.volume = 0.1;
        windAudio.play().catch(() => console.log("Wind audio failed—skipped"));

        if (step === -1) {
            setTimeout(() => {
                setStep(0); // Start with first dialogue and panel after flash
                const newRevealed = [...revealedPanels];
                newRevealed[0] = true; // Reveal Panel 1 immediately
                setRevealedPanels(newRevealed);
            }, 500); // Flash-in duration
        }

        if (step >= 0 && step < 3) {
            const panelAudio = new Audio(dialogue[step].sound);
            panelAudio.volume = 0.8;
            panelAudio.play().catch(() => console.log("Panel audio failed—skipped"));
        }

        return () => {
            windAudio.pause();
        };
    }, [step]);

    return (
        <div className="scene-container" onClick={handleClick}>
            <img src="/images/battlefield.png" alt="Tiber Verge" className="background" />
            {step >= 0 && !redFlash && (
                <div className="comic-container">
                    <div className={`panel panel-0 ${revealedPanels[0] ? "revealed" : "empty"}`}>
                        {revealedPanels[0] && <img src={panels[0].image} alt="Panel 1" />}
                    </div>
                    <div className={`panel panel-1 ${revealedPanels[1] ? "revealed" : "empty"}`}>
                        {revealedPanels[1] && <img src={panels[1].image} alt="Panel 2" />}
                    </div>
                    <div className={`panel panel-2 ${revealedPanels[2] ? "revealed" : "empty"}`}>
                        {revealedPanels[2] && <img src={panels[2].image} alt="Panel 3" />}
                    </div>
                </div>
            )}
            {step >= 0 && step <= 3 && !redFlash && (
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
                    {dialogue[step].character === "Both" && (
                        <>
                            <img
                                src="/images/ello-sprite.png"
                                alt="Ello"
                                className={`sprite ello active ${dialogue[step].animation}`}
                            />
                            <img
                                src="/images/sal-sprite.png"
                                alt="Sal"
                                className={`sprite sal active ${dialogue[step].animation}`}
                            />
                        </>
                    )}
                    <DialogueBox
                        character={dialogue[step].character}
                        text={dialogue[step].text}
                        sound={null} // Sound handled in useEffect or handleClick
                    />
                </>
            )}
            {step === -1 && <div className="flash-in" />}
            {redFlash && <div className="red-flash" />}
            {fadeOut && <div className="fade-out" />}
            <SaveNotice />
        </div>
    );
}
