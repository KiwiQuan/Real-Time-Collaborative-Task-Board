import React from "react";
import XSign from "../assets/XSign";

export default function ModalOverlay({ onClose, children, title }) {
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
        className="max-w-lg w-full bg-white flex flex-col gap-10 rounded-lg shadow-lg px-6 pt-4 pb-9 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between">
          {title && <h2 className="modal-title text-2xl font-bold">{title}</h2>}
          <XSign
            className="modal-close cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-1 size-7 stroke-gray-600 hover:stroke-gray-700 transition-colors duration-200"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
