
import React, { useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface AppState {
  ip?: string;
  region?: string;
  country?: string;
  timezone?: {
    abbr: string;
    utc: string;
  };
  connection?: {
    isp: string;
  };
  [key: string]: any;
}

interface AppContextType {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({});
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ state, setState, selected, setSelected }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export type { AppContextType, AppState };
