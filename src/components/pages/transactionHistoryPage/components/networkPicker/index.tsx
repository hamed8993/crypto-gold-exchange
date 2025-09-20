import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import { useGetGet_available_coins } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { useTransactionsHistoryContext } from "../../provider";

function NetworkPicker() {
  const t = useTranslations();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { watch, setValue } = useTransactionsHistoryContext();

  const network = watch("network");

  const {
    data: availableCoins,
    error: errorMarkets,
    isLoading: isLoadingMarkets,
  } = useGetGet_available_coins();
  const coins = availableCoins?.result || [];

  const networks = coins.flatMap((coin) => coin.networks);

  return (
    <Fragment>
      <CustomButton
        className="border-accentText50 flex min-h-10 w-full min-w-24 items-center justify-center rounded-lg border"
        onClick={() => setIsDrawerOpen(true)}
        variant="outline"
      >
        <p>{network || t("chooseNetwork")}</p>
      </CustomButton>
      <CustomDrawer
        hasCross={false}
        height="fit-content"
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        <div className="flex h-full w-full flex-col gap-2 overflow-auto px-3 py-4">
          {isLoadingMarkets || errorMarkets ? (
            <LoadingView />
          ) : networks.length === 0 ? (
            <EmptyView wrapperClassName="min-h-96" />
          ) : (
            networks.map((item, index) => (
              <div
                className="flex h-fit w-full items-center p-2 hover:cursor-pointer"
                key={index}
                onClick={() => {
                  setValue("network", item);
                  setIsDrawerOpen(false);
                }}
              >
                <p className="text-mainText w-full text-sm">
                  {item.toUpperCase()}
                </p>
                <div className="flex min-h-10 min-w-10 items-center justify-center">
                  {network === item ? (
                    <BiCheck className="text-mainText d h-7 w-7" />
                  ) : (
                    <IoChevronForward className="text-accentText h-6 w-6 rtl:rotate-180" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CustomDrawer>
    </Fragment>
  );
}

export default NetworkPicker;
