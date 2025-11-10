'use client';

import { useEffect } from 'react';

export default function Protection() {
  useEffect(() => {
    // ⚠️ CRITICAL FIX: Check if we're inside an iframe
    const isInIframe = window.self !== window.top;

    // Disable right-click
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 123 || // F12
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
          (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
          (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
          (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
          (e.ctrlKey && e.keyCode === 83)) { // Ctrl+S
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable copy
    const handleCopy = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners (these work fine in iframes)
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);

    // DevTools detection - ONLY run if NOT in iframe
    let detectDevTools: NodeJS.Timeout | null = null;
    
    if (!isInIframe) {
      detectDevTools = setInterval(() => {
        const threshold = 160;
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
          document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a192f;color:#64ffda;font-family:Montserrat,sans-serif;font-size:24px;text-align:center;padding:20px;">⚠️ Developer Tools detected. Please close it to continue.</div>';
        }
      }, 500);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      
      // Only clear interval if it was created
      if (detectDevTools) {
        clearInterval(detectDevTools);
      }
    };
  }, []);

  return null;
}
