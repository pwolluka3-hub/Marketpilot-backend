import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadBrandKit, saveBrandKit } from '../services/memoryService';

const BrandContext = createContext(null);

/**
 * Wraps children with BrandContext, exposing the current brand kit and an updater that persists changes.
 *
 * @param {{ children: import('react').ReactNode }} props - React children to render inside the provider.
 * @returns {JSX.Element} The BrandContext provider element.
 */
export function BrandProvider({ children }) {
  const [brandKit, setBrandKit] = useState(null);

  useEffect(() => {
    loadBrandKit().then((kit) => setBrandKit(kit));
  }, []);

  const updateBrandKit = async (next) => {
    setBrandKit(next);
    await saveBrandKit(next);
  };

  const value = useMemo(() => ({ brandKit, updateBrandKit }), [brandKit]);
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export const useBrandContext = () => useContext(BrandContext);