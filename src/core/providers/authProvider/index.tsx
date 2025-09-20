// @nosort-imports
import { persistKeys } from "@/core/constants/keys";
import useUrl from "@/core/hooks/useUrl";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  accessToken: string;
  deviceToken: string;
  handleSavingTokens: (tokens: { LT: string }) => void;
  isLoggedIn: boolean;
  logoutIsLoading: boolean;
  loggedInToken: string;
  setAccessToken: (token: string) => void;
  setDeviceToken: (token: string) => void;
  handleLogout: () => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({
  children,
  loginFromCookie,
}: {
  children: ReactNode;
  loginFromCookie: string;
}) => {
  const { locale } = useUrl();
  const [deviceToken, setDeviceToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loggedInToken, setLoggedInToken] = useState("");
  const [logoutIsLoading, setLogoutIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!loginFromCookie);

  useEffect(() => {
    setIsLoggedIn(Boolean(getCookie(persistKeys.GOLDFINO_LOGIN_TOKEN)));
  }, []);

  const domainSplitted =
    process.env.NEXT_PUBLIC_BASE_URL?.replace("https://", ".").split(".") || [];
  const domain =
    domainSplitted?.length >= 3
      ? `.${domainSplitted.slice(-2).join(".")}`
      : undefined;

  const logoutMutate = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setLogoutIsLoading(false);
          deleteCookie(persistKeys.GOLDFINO_LOGIN_TOKEN);
          setTimeout(() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`;
          }, 100);
        }
      })
      .catch(() => {});
  };

  const handleDeletingTokens = () => {
    setLogoutIsLoading(true);
    setAccessToken("");
    setDeviceToken("");
    setLoggedInToken("");

    deleteCookie(persistKeys.GOLDFINO_LOGIN_TOKEN, {
      domain: process.env.NODE_ENV === "production" ? domain : undefined,
    });

    logoutMutate();
  };

  const handleLogout = () => {
    handleDeletingTokens();
  };

  const handleSavingTokens = ({ LT }: { LT: string }) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    setCookie(persistKeys.GOLDFINO_LOGIN_TOKEN, LT, { expires, domain });

    setLoggedInToken(LT);
  };

  const value = useMemo(
    () => ({
      accessToken,
      deviceToken,
      handleSavingTokens,
      isLoggedIn,
      loggedInToken,
      setAccessToken,
      setDeviceToken,
      handleLogout,
      logoutIsLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      accessToken,
      deviceToken,
      loggedInToken,
      isLoggedIn,
      handleLogout,
      logoutIsLoading,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
