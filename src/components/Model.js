import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Model = ({ isOpen, onClose, children, navigateTo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleOnClose = () => {
    if (navigateTo) {
      onClose();
      navigate(navigateTo);
    } else {
      onClose();
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-slate-100 bg-opacity-30 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`} // Add transition opacity here for fade effect
      role="dialog"
      aria-labelledby="model-title"
      aria-modal="true"
    >
      <div
        className={`bg-gradient-to-r from-orange-400 to-yellow-300 rounded-lg shadow-lg p-6 max-w-md lg:w-full relative transform transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`} // Apply transitions for scaling and fading in/out
      >
        <button
          className="absolute top-2 right-2 text-gray-600 font-bold hover:text-gray-800"
          onClick={handleOnClose}
          aria-label="Close"
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  buttonLabel,
  navigateTo,
}) => {
  const navigate = useNavigate();

  const handleOnClose = () => {
    if (navigateTo) {
      onClose(); // Close the modal first
      navigate(navigateTo); // Then navigate
    } else {
      onClose(); // Just close the modal if no navigateTo is provided
    }
  };
  return (
    <Model isOpen={isOpen} onClose={onClose} navigateTo={navigateTo}>
      <h2 id="" model-title className="text-lg font-bold text-black">
        {title}
      </h2>
      <p className="text-gray-700">{message}</p>
      <button
        className="mt-4 px-2 bg-blue-500 text-white rounded-lg"
        onClick={handleOnClose}
      >
        {buttonLabel || "Ok"}
      </button>
    </Model>
  );
};

export { AlertModal };
export default Model;
