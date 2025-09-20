"use client";

import CustomDrawer from "@/components/atoms/customDrawer";
import CoinNetworkItem from "@/components/pages/depositPage/components/coinNetworkItem";
import { useWithdrawContext } from "@/components/pages/withdrawPage/provider";
import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";

function SelectCoin() {
  const { locale } = useUrl();

  const { watch, setValue } = useWithdrawContext();

  const { data } = useGetGet_available_coins();
  const coinsList = data?.result;

  const onClose = () => {
    setValue("isCoinDrawerOpen", false);
  };

  const selectCoin = (coin: string) => {
    setValue("selectedCoin", coin);
    setValue("isCoinDrawerOpen", false);
  };

  return (
    <CustomDrawer
      hasCross={false}
      height="500px"
      isOpen={watch("isCoinDrawerOpen")}
      onClose={onClose}
    >
      <div className="flex h-full w-full flex-col items-center justify-start p-2 py-4">
        {coinsList?.map((item) => {
          return (
            <CoinNetworkItem
              description={locale === "fa" ? item.name_fa : item.name_en}
              key={item.symbol}
              onClick={() => {
                selectCoin(item?.symbol);
                onClose();
              }}
              src={`/assets/images/${item.symbol.toLowerCase()}.svg`}
              title={item.symbol?.toUpperCase()}
            />
          );
        })}
      </div>
    </CustomDrawer>
  );
}

export default SelectCoin;
