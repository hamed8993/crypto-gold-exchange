"use client";

import CustomDrawer from "@/components/atoms/customDrawer";
import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";
import { useDepositContext } from "../../provider";
import CoinNetworkItem from "../coinNetworkItem";

function SelectCoinDrawer() {
  const { locale } = useUrl();
  const { watch, setValue } = useDepositContext();
  const { data } = useGetGet_available_coins();

  const isSelectCoinDrawerOpen = watch("isSelectCoinDrawerOpen");

  const searchedData = data?.result;

  const selectCoin = (coin: string, index: number) => {
    setValue("coin", coin);
    setValue("coinIndex", index);
  };

  const onClose = () => {
    setValue("isSelectCoinDrawerOpen", false);
  };

  return (
    <CustomDrawer
      isOpen={isSelectCoinDrawerOpen}
      onClose={onClose}
      hasCross={false}
      height="500px"
    >
      <div className="flex h-full w-full flex-col items-center justify-start p-2 pb-4">
        {searchedData?.map((item, index) => {
          return (
            <CoinNetworkItem
              description={locale === "fa" ? item.name_fa : item.name_en}
              onClick={() => {
                selectCoin(item.symbol, index);
                onClose();
              }}
              src={`/assets/images/${item.symbol.toLowerCase()}.webp`}
              title={item.symbol?.toUpperCase()}
              key={index}
            />
          );
        })}
      </div>
    </CustomDrawer>
  );
}

export default SelectCoinDrawer;
