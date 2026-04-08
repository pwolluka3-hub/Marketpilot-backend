import { useEffect, useState } from 'react';

/**
 * React hook that provides the current browser network connectivity status.
 *
 * The returned value updates when the browser fires `online` or `offline` events.
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
