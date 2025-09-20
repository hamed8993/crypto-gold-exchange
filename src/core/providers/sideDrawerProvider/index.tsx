import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface SideDrawerContextProps {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const initialValue: SideDrawerContextProps = {
  isSideMenuOpen: false,
  setIsSideMenuOpen: () => undefined,
};

const SideDrawerContext = createContext<SideDrawerContextProps>(initialValue);

const SideDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

  return (
    <SideDrawerContext.Provider
      value={{
        isSideMenuOpen,
        setIsSideMenuOpen,
      }}
    >
      {children}
    </SideDrawerContext.Provider>
  );
};

export { SideDrawerContext, SideDrawerProvider };
