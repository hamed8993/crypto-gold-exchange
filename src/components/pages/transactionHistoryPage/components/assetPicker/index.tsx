import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { useTransactionsHistoryContext } from "../../provider";

function AssetPicker() {
  const t = useTranslations();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { setValue, watch } = useTransactionsHistoryContext();

  const asset = watch("asset");

  const { data, isLoading, error } = useGetUser_dataBalance();

  const assets = data?.result?.main?.map((item) => item.coin) || [];

  const { getQuoteName } = useMarketsNamesData();

  return (
    <Fragment>
      <CustomButton
        className="border-accentText50 flex min-h-10 w-full min-w-24 items-center justify-center rounded-lg border"
        onClick={() => setIsDrawerOpen(true)}
        variant="outline"
      >
        <p>{asset || t("chooseAsset")}</p>
      </CustomButton>
      <CustomDrawer
        hasCross={false}
        height="fit-content"
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="flex w-full flex-col gap-3 px-3 py-4">
          {isLoading || error ? (
            <LoadingView />
          ) : assets.length === 0 ? (
            <EmptyView wrapperClassName="min-h-96" />
          ) : (
            assets.map((item, index) => (
              <div
                className="flex w-full items-center p-2"
                key={index}
                onClick={() => {
                  setValue("asset", item);
                  setIsDrawerOpen(false);
                }}
              >
                <p className="text-mainText w-full text-sm">
                  {getQuoteName(item)}
                </p>
                <div className="flex min-h-10 min-w-10 items-center justify-center">
                  {asset === item ? (
                    <BiCheck className="text-mainText h-7 w-7" />
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

export default AssetPicker;
