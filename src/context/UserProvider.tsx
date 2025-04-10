import { createContext, useCallback, useMemo, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ContextValue {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export const UserContext = createContext<ContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const contextValue: ContextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
