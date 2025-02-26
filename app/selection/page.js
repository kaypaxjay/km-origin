"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./selection.css";

export default function Selection() {
    const [choice, setChoice] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const reportRef = useRef(null);
    const router = useRouter();

    const handleChoice = (selected) => {
        setChoice(selected);
        setSubmitted(true);
        localStorage.setItem("playerIdeal", selected);
    };

    const handleShare = () => {
        const text =
            choice === "ello"
                ? "I’m Kekius Maximus, Champion of the People! Play Kekius Maximus: The Origins: https://km-origins.vercel.app #KekiusMaximus"
                : "I’m Kekius Maximus, Lord of the Bold! Play Kekius Maximus: The Origins: https://km-origins.vercel.app #KekiusMaximus";
        const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="selection-container">
            {!submitted ? (
                <>
                    <h1>Congratulations, Legionary!</h1>
                    <p>
                        You’ve walked the path of *Kekius Maximus: The Origins*. After this tale of
                        iron and stars, whose ideals do you hold dear—Ello’s vision for all, or
                        Sal’s reign of the bold?
                    </p>
                    <div className="choice-buttons">
                        <button onClick={() => handleChoice("ello")}>Ello – For the People</button>
                        <button onClick={() => handleChoice("sal")}>Sal – For the Bold</button>
                    </div>
                </>
            ) : (
                <div className="report-card" ref={reportRef}>
                    <h2>Your Path as Kekius Maximus</h2>
                    <img
                        src={
                            choice === "ello"
                                ? "/images/ello-sprite-report.png"
                                : "/images/sal-sprite-report.png"
                        }
                        alt={choice === "ello" ? "Ello" : "Sal"}
                        className="report-image"
                    />
                    <h3>You are Kekius Maximus</h3>
                    <h4>{choice === "ello" ? "Champion of the People" : "Lord of the Bold"}</h4>
                    <p className="description">
                        {choice === "ello"
                            ? "You wield the might of Grok’s honest hands, forging a world where every soul rises from the dust to the stars. Your strength is unity, your crown the trust of the meek."
                            : "You command the iron that reigns, a bold king above the rest, where machina replace the frail and lift the strong to rule the skies. Your throne is power, your legacy steel."}
                    </p>
                    <p className="trait">
                        <strong>Core Trait:</strong>{" "}
                        {choice === "ello"
                            ? "Empathy – You build for all."
                            : "Ambition – You rise above all."}
                    </p>
                </div>
            )}
            {submitted && (
                <div className="report-buttons">
                    <button className="share-button" onClick={handleShare}>
                        Share on X
                    </button>
                    <button className="return-link" onClick={() => router.push("/")}>
                        Return to Legion
                    </button>
                </div>
            )}
        </div>
    );
}
