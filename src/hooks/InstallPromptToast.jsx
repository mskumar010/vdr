import React from "react";
import { useInstallPrompt } from "./useInstallPrompt";
import "./InstallPromptToast.css";
import { Send } from "lucide-react";
const InstallPromptToast = () => {
  const { showInstallToast, installApp, closeToast } = useInstallPrompt();

  if (!showInstallToast) return null;

  return (
    <div className="install-prompt-toast">
      <div className="flex items-center">
        <div className="icon">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg> */}
          <Send size={95}></Send>
        </div>
        <div>
          <h3 className="install-prompt-toast__title">Install VHC App</h3>
          <p className="install-prompt-toast__desc">
            Add to home screen for faster access
          </p>
        </div>
      </div>

      <div className="install-prompt-toast__actions">
        <button
          onClick={installApp}
          className="install-prompt-toast__install-btn"
        >
          Install
        </button>
        <button
          onClick={closeToast}
          className="install-prompt-toast__close-btn"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InstallPromptToast;
