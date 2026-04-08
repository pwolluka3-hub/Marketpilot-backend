import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadBrandKit, saveBrandKit } from '../services/memoryService';

const BrandContext = createContext(null);

/**
 * Provides BrandContext to descendants, loading the initial brand kit on mount and persisting updates.
 *
 * @param {object} props - Component props.
 * @param {import('react').ReactNode} props.children - Child elements to render inside the provider.
 * @returns {JSX.Element} The context provider element exposing `brandKit` and `updateBrandKit`.
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