/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import CustomDrawer from "@/components/atoms/customDrawer";
import CoinNetworkItem from "@/components/pages/depositPage/components/coinNetworkItem";
import { useWithdrawContext } from "@/components/pages/withdrawPage/provider";
import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";

function NetworkSelect() {
  const { locale } = useUrl();

  const { watch, setValue } = useWithdrawContext();

  const selectedCoin = watch("selectedCoin");
  const isNetworkDrawerOpen = watch("isNetworkDrawerOpen");

  const { data } = useGetGet_available_coins();
  const coinsList = data?.result;

  const networkList = coinsList?.find(
    (item) => item.symbol === selectedCoin,
  )?.networks_data;

  const onClose = () => {
    setValue("isNetworkDrawerOpen", false);
  };

  const selectNetwork = (network: string) => {
    setValue("selectedNetwork", network);
    setValue("isNetworkDrawerOpen", false);
  };

  return (
    <CustomDrawer
      hasCross={false}
      height="500px"
      isOpen={isNetworkDrawerOpen}
      onClose={onClose}
    >
      <div className="flex h-full w-full flex-col items-center justify-start p-2 py-4">
        {//@ts-ignore
        networkList?.map((item, index: number) => {
          return (
            <CoinNetworkItem
              description={locale === "fa" ? item.name_fa : item.name_en}
              key={index}
              onClick={() => {
                selectNetwork(item.symbol);
              }}
              src={`/assets/images/${item.symbol.toLowerCase() === "bsc" ? "bnb" : item.symbol.toLowerCase()}.webp`}
              title={item.symbol?.toUpperCase()}
            />
          );
        })}
      </div>
    </CustomDrawer>
  );
}

export default NetworkSelect;
