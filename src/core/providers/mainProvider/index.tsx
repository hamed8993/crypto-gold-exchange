/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  DefaultError,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { ApiMessagesProvider } from "../apiMessagesProvider";
import { AssetVisibilityProvider } from "../assetVisibilityProvider";
import { AuthProvider, useAuth } from "../authProvider";
import { CopyNotificationProvider } from "../copyNotificationProvider";
import { FirstBidAskProvider } from "../firstBidAskProvider";
import { MarketsNamesProvider } from "../getCoinName";
import { MarketsProvider } from "../markets";
import { NotificationProvider } from "../notificationProvider";
import { SideDrawerProvider } from "../sideDrawerProvider";

interface MainProviderProps {
  children: ReactNode;
  loginFromCookie: string;
}

function Component({ children }: MainProviderProps) {
  const { handleLogout } = useAuth();

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error: DefaultError) => {
        // @ts-ignore
        if (error?.message?.error === "e0") {
          handleLogout();
        }
      },
    }),
    queryCache: new QueryCache({
      onError: (error: DefaultError) => {
        // @ts-ignore
        if (error?.message?.error === "e0") {
          handleLogout();
        }
        return false;
      },
    }),
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 2000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ApiMessagesProvider>
        <MarketsProvider>
          <MarketsNamesProvider>
            <NotificationProvider>
              <CopyNotificationProvider>
                <AssetVisibilityProvider>
                  <SideDrawerProvider>
                    <FirstBidAskProvider>{children}</FirstBidAskProvider>
                  </SideDrawerProvider>
                </AssetVisibilityProvider>
              </CopyNotificationProvider>
            </NotificationProvider>
          </MarketsNamesProvider>
        </MarketsProvider>
      </ApiMessagesProvider>
    </QueryClientProvider>
  );
}

const MainProvider = ({ ...props }: MainProviderProps) => {
  return (
    <AuthProvider loginFromCookie={props.loginFromCookie}>
      <Component {...props} />
    </AuthProvider>
  );
};

export default MainProvider;
