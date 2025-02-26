"use client";

import "./CartPopup.css";

export default function CartPopup({ image, onClose }) {
    return (
        <div className="cart-popup-overlay" onClick={onClose}>
            <div className="cart-popup-content">
                <img src={image} alt="Machina Cart" className="cart-image" />
            </div>
        </div>
    );
}
