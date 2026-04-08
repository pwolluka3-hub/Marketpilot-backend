import { useEffect, useState } from 'react';

/**
 * Tracks whether the browser is currently online.
 *
 * Subscribes to window `online` and `offline` events and updates the returned value when network status changes.
 * @returns {boolean} `true` if the browser is online, `false` otherwise.
 */
export function useNetwork() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return online;
}