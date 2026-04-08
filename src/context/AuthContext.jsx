import { createContext, useContext, useMemo, useState } from 'react';
import { puterAuth } from '../services/puterService';

const AuthContext = createContext(null);

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
