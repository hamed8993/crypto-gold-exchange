"use client";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import HighlightSectionMarketTrends from "./components/highlightSectionMarketTrends";
import MarketSelection from "./components/marketSelection";
import TodayMarketTable from "./components/todayMarketTable";

interface LiveMarketSectionProps {
  containerClassName?: string;
}

function LiveMarketSection({ containerClassName }: LiveMarketSectionProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "bg-newColor_bgNeutral px-0 lg:px-0 2xl:px-[144px]",
        containerClassName,
      )}
    >
      <div className="flex w-full flex-col gap-9 bg-transparent">
        <HighlightSectionMarketTrends className="bg-transparent" />
        <div className="border-newColor_borderNeutral10 bg-landingMainBackground mx-auto w-full rounded-none border p-[42px] lg:w-full lg:rounded-lg 2xl:w-[1154px]">
          <div className="flex w-full justify-between">
            <h2 className="text-newColor_bgPrimary50 text-[38px] font-normal">
              {t("todayMarket")}
            </h2>

            <ButtonDefault
              className="border-newColor_borderNeutral10 bg-constantLight h-12! rounded-xl border px-6 py-4"
              variant="outline"
              href="/markets"
            >
              <p className="text-mainText text-sm font-normal">
                {t("showAll")}
              </p>
            </ButtonDefault>
          </div>
          <MarketSelection containerClassName="mt-10 mb-[10px]" />
          <TodayMarketTable />
        </div>
      </div>
    </div>
  );
}

export default LiveMarketSection;
