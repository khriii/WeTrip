import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAuth, logout as apiLogout } from "../api/auth";


interface User {
  id: number,
  username: string
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const foundUser = await checkAuth();

      if (foundUser) {
        setUser(foundUser);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
