"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useGetExchange_dataMarkets_details } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import ItemRow from "./components/itemRow";
import TabHeader from "./components/tabHeader";

export type marketsSortType = "name" | "nameReverse";
interface MarketsPageProps {
  className?: string;
}

function MarketsPage({ className }: MarketsPageProps) {
  const t = useTranslations();

  const { data } = useGetExchange_dataMarkets_details();
  const dataToDisplay = data?.result;

  return (
    <PwaPageLayout
      wrapperClassName={className}
      title={t("markets")}
      containerClassName="bg-secondBackground  pr-0 pl-0"
    >
      <div className="mt-2 flex h-full w-full flex-col items-center justify-start">
        <TabHeader />
        {dataToDisplay?.map((item) => {
          return <ItemRow item={item} key={item?.symbol} />;
        })}
      </div>
    </PwaPageLayout>
  );
}

export default MarketsPage;
