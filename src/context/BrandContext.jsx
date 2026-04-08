import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadBrandKit, saveBrandKit } from '../services/memoryService';

const BrandContext = createContext(null);

/**
 * Provides brand-kit state and an updater to descendant components.
 *
 * Loads persisted brand-kit data when mounted and exposes `brandKit` plus
 * `updateBrandKit(next)` which updates local state and persists the new kit.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements rendered inside the provider.
 * @returns {JSX.Element} A context provider supplying `{ brandKit, updateBrandKit }` to descendants.
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
