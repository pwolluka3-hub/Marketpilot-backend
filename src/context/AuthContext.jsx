import { createContext, useContext, useMemo, useState } from 'react';
import { puterAuth } from '../services/puterService';

const AuthContext = createContext(null);

/**
 * Provides authentication state and actions to descendant components.
 *
 * Exposes a context value with the current `user` and a `signIn` function that updates `user`.
 *
 * @param {{ children: React.ReactNode }} props - Component props.
 * @param {React.ReactNode} props.children - Children to render inside the provider.
 * @returns {JSX.Element} A React context provider that supplies `{ user, signIn }` to descendants.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = async () => {
    const profile = await puterAuth();
    setUser(profile);
  };

  const value = useMemo(() => ({ user, signIn }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
