// @nosort-imports
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface InitialValueProps {
  isShownAssetsAmounts: boolean;
  setIsShownAssetsAmounts: Dispatch<SetStateAction<boolean>>;
}

const initialValue: InitialValueProps = {
  isShownAssetsAmounts: false,
  setIsShownAssetsAmounts: () => {},
};

export const AssetVisibilityContext = createContext(initialValue);

export const AssetVisibilityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isShownAssetsAmounts, setIsShownAssetsAmounts] =
    useState<boolean>(false);

  useEffect(() => {
    const savedVisibility = localStorage.getItem("visibility") === "true";
    setIsShownAssetsAmounts(savedVisibility);
  }, []);

  useEffect(() => {
    localStorage.setItem("visibility", String(isShownAssetsAmounts));
  }, [isShownAssetsAmounts]);

  // const getVisibleText = <T,>(text: T) => {
  //   return isShownAssetsAmounts ? text : invisibleString;
  // };

  return (
    <AssetVisibilityContext.Provider
      value={{
        isShownAssetsAmounts,
        setIsShownAssetsAmounts,
      }}
    >
      {children}
    </AssetVisibilityContext.Provider>
  );
};

export const useVisibility = () => useContext(AssetVisibilityContext);
