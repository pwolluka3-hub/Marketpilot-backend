import { useEffect, useState } from 'react';

/**
 * Exposes the browser's current network connectivity state to React components.
 *
 * Subscribes to the window 'online' and 'offline' events to keep the returned value in sync and removes those listeners on unmount.
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