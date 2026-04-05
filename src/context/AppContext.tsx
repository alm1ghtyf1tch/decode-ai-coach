import { createContext, useContext, useState, ReactNode } from "react";

type Role = "rookie" | "competitor" | "judge" | null;

interface AppContextType {
  role: Role;
  setRole: (r: Role) => void;
  onboarded: boolean;
  setOnboarded: (v: boolean) => void;
  xp: number;
  level: number;
  streak: number;
}

const AppContext = createContext<AppContextType>({
  role: null, setRole: () => {}, onboarded: false, setOnboarded: () => {},
  xp: 1250, level: 7, streak: 5,
});

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [onboarded, setOnboarded] = useState(false);

  return (
    <AppContext.Provider value={{ role, setRole, onboarded, setOnboarded, xp: 1250, level: 7, streak: 5 }}>
      {children}
    </AppContext.Provider>
  );
}
