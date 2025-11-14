import React from "react";

export default function ModalOverlay({ onClose, children }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay" || "modal-content")) {
      console.log(e.target.classList);
      if (onClose) onClose();
    }
  };

  return (
    <div
      className="modal-overlay z-40 fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close self-start"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
