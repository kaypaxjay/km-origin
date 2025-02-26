"use client";

import { useState, useEffect } from "react";
import "./DialogueBox.css";

export default function DialogueBox({ character, text, sound }) {
    useEffect(() => {
        if (sound) {
            const audio = new Audio(sound);
            audio.volume = 0.8;
            audio.play().catch(() => console.log("Dialogue audio failed—skipped"));
        }
    }, [sound]);

    return (
        <div className="dialogue-box">
            <div className="character-name">{character}</div>
            <div className="dialogue-text">{text}</div>
            <div className="dialogue-arrow"></div> {/* Static arrow */}
        </div>
    );
}
