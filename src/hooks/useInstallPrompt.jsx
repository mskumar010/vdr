// src/hooks/useInstallPrompt.jsx
import { useState, useEffect } from 'react';
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallToast, setShowInstallToast] = useState(false);
  useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    // Only show prompt on mobile devices that haven't installed the app
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && !isAppInstalled) {
      // Listen for the beforeinstallprompt event
      const handleBeforeInstallPrompt = (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        setDeferredPrompt(e);
        // Show the install toast
        setShowInstallToast(true);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);
  const installApp = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We no longer need the prompt regardless of outcome
    setDeferredPrompt(null);
    
    // Hide the toast
    setShowInstallToast(false);
    
    return outcome;
  };
  const closeToast = () => {
    setShowInstallToast(false);
  };
  return { showInstallToast, installApp, closeToast };
}
