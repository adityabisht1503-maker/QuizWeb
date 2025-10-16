import { useEffect } from 'react';

const useAntiCheat = (onCheat) => {
  // 🔹 Tab/Window switch detection
  
  // 🔹 Fullscreen detection
  useEffect(() => {
    const enterFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    };
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onCheat("Fullscreen exited");
      }
    };

    enterFullscreen();
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onCheat]);
  

  // 🔹 Right-click and dev tools prevention
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    const disableKeys = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && ['u', 's', 'c', 'v'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableKeys);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableKeys);
    };
  }, []);
}

export default useAntiCheat;
