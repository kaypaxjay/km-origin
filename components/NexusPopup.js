"use client";

import "./NexusPopup.css";

export default function NexusPopup({ image, onClose }) {
    return (
        <div className="nexus-popup-overlay" onClick={onClose}>
            <div className="nexus-popup-content">
                <img src={image} alt="Forum Nexus Podium" className="nexus-image" />
            </div>
        </div>
    );
}
