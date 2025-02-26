"use client";

import "./VaultPopup.css";

export default function VaultPopup({ image, onClose }) {
    return (
        <div
            className="vault-overlay"
            onClick={(e) => {
                e.stopPropagation(); // Prevent scene click
                onClose();
            }}
        >
            <div className="vault-popup">
                <img src={image} alt="Coin Vault" className="vault-image" />
            </div>
        </div>
    );
}
