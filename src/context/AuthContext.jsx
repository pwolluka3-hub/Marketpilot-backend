import { createContext, useContext, useMemo, useState } from 'react';
import { puterAuth } from '../services/puterService';

const AuthContext = createContext(null);

/**
 * Provides authentication state and a sign-in function to descendant components via AuthContext.
 *
 * @param {{ children: import('react').ReactNode }} props - The children to render inside the provider.
 * @returns {import('react').JSX.Element} The AuthContext provider element wrapping the children.
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