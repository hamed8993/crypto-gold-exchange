/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import CustomDrawer from "@/components/atoms/customDrawer";
import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";
import { useDepositContext } from "../../provider";
import CoinNetworkItem from "../coinNetworkItem";

function SelectNetworkDrawer() {
  const { locale } = useUrl();
  const { data } = useGetGet_available_coins();
  const { watch, setValue } = useDepositContext();

  const coin = watch("coin");
  const isSelectNetworkDrawerOpen = watch("isSelectNetworkDrawerOpen");

  const networks = data?.result?.find(
    (item) => item.symbol === coin,
  )?.networks_data;

  const onClose = () => {
    setValue("isSelectNetworkDrawerOpen", false);
  };

  const selectCoin = (network: string) => {
    setValue("network", network);
  };

  return (
    <CustomDrawer
      isOpen={isSelectNetworkDrawerOpen}
      onClose={onClose}
      hasCross={false}
      height="500px"
    >
      <div className="flex h-full w-full flex-col items-center justify-start p-2 pb-4">
        {//@ts-ignore
        networks?.map((item, index) => {
          return (
            <CoinNetworkItem
              description={locale === "fa" ? item.name_fa : item.name_en}
              onClick={() => {
                selectCoin(item.symbol);
                onClose();
              }}
              src={`/assets/images/${item.symbol.toLowerCase() === "bsc" ? "bnb" : item.symbol.toLowerCase()}.webp`}
              title={item.symbol?.toUpperCase()}
              key={index}
            />
          );
        })}
      </div>
    </CustomDrawer>
  );
}

export default SelectNetworkDrawer;
