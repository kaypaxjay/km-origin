"use client";

import "./ChoiceButton.css";

export default function ChoiceButton({ text, onClick }) {
    return (
        <button className="choice-button" onClick={onClick}>
            {text}
        </button>
    );
}
