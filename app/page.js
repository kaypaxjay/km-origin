"use client";

import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
    const router = useRouter();

    const handleStart = () => {
        router.push("/scenes/battle-opening");
    };

    return (
        <div className="landing-container">
            <div className="title">
                <h1>Kekius Maximus</h1>
                <h2>The Origins</h2>
            </div>
            <button className="start-button" onClick={handleStart}>
                Start Novel
            </button>
            <p className="disclaimer">Best played on PC</p>
        </div>
    );
}
