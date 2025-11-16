import React from "react";

export default function ModalOverlay({ onClose, children }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
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
        className="max-w-lg w-full bg-white flex flex-col gap-4 rounded-lg shadow-lg px-6 pt-4 pb-9 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close text-2xl self-end font-bold cursor-pointer"
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
