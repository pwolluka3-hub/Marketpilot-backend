import { createContext, useContext, useMemo, useState } from 'react';
import { puterAuth } from '../services/puterService';

const AuthContext = createContext(null);

/**
 * Provides authentication context (current user and sign-in action) to descendant components.
 * @param {{ children: React.ReactNode }} props - Children to render inside the provider.
 * @returns {JSX.Element} A context provider that supplies `{ user, signIn }` to descendants.
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