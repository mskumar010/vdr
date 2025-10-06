import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

// Suppress Workbox logs
if ("workbox" in window) {
  window.workbox.setConfig({ debug: false });
}

// Register the service worker using Vite PWA's virtual module
const updateSW = registerSW({
  onNeedRefresh() {
    // Show a notification or UI element to prompt refresh
    if (confirm("New content available. Reload?")) {
      updateSW();
    }
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);