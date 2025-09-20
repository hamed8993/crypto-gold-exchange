import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import MarketIcon from "@/components/atoms/svg/marketIcon";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { BsCalculator } from "react-icons/bs";
import { CiSquareCheck } from "react-icons/ci";

const AnimationComponent = dynamic(
  () => import("./AnimationComponent").then((module) => module.default),
  { ssr: false },
);

interface MarketHelpDrawerProps {
  isOpen: boolean;
  leverages?: Array<string>;
  name?: string;
  onClose: () => void;
  plMultiplier?: number;
  priceStep?: number;
  quote?: string;
  symbol?: string;
}

function MarketHelpDrawer({
  isOpen,
  leverages,
  name,
  onClose,
  plMultiplier,
  priceStep,
  quote,
  symbol,
}: MarketHelpDrawerProps) {
  const t = useTranslations();
  const { getMarketStatus } = useMarketsNamesData();
  const marketStatus = getMarketStatus(symbol || "");
  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      hasCross={false}
      drawerClassName="bg-secondBackground "
      height="fit-content min-h-[500px]"
    >
      <div className="flex w-full flex-col items-center justify-between px-5 pt-2 pb-5">
        <div className="flex w-full flex-col items-center justify-start gap-1">
          <div className="bg-accentText50 flex h-1 w-[40%] rounded-full"></div>
          <div className="mt-4 flex w-full items-center justify-between gap-2">
            <div className="mt-2 flex w-full items-center justify-start">
              <div className="border-mainBrandAlternative flex min-h-14 min-w-14 items-center justify-center rounded-full border-0">
                <MarketIcon size={40} color="#0d77e7" />
              </div>
              <div className="mx-0 flex min-h-8 flex-col items-start justify-around">
                <p className="text-mainText text-lg">{name}</p>
                <p className="text-accentText text-sm">
                  {symbol?.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="mt-2 flex max-h-6 w-full items-center justify-end px-2">
              <div className="h-8 w-8">
                <AnimationComponent />
              </div>
              <p
                className={clsx(
                  "dark text-sm",
                  marketStatus === "activeMarket"
                    ? "text-positive"
                    : "text-accentText",
                )}
              >
                {t(marketStatus)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex w-full items-center justify-between gap-2">
            <div className="border-accentText50 shadow-accentText50 flex h-20 min-h-20 w-full flex-col items-center justify-around rounded-lg border p-2 py-3 shadow-sm">
              <p className="text-accentText text-xs">{t("marketHelpDec2")}</p>
              <div className="mt-1 flex h-full items-end justify-start px-1">
                {leverages?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        "bg-accentText50 mx-[2px] flex items-center justify-center rounded-md p-[3px] px-[5px]"
                      }
                    >
                      <p className="font-english text-[10px] text-white">{`${item}X`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-accentText50 shadow-accentText50 flex h-20 min-h-20 w-full flex-col items-center justify-around rounded-lg border p-2 py-3 shadow-sm">
              <p className="text-accentText text-xs">{t("marketHelpDec3")}</p>
              <p className="text-mainText mt-1 text-sm">
                {`${addCommaSeparator(priceStep || "")} ${quote}`}
              </p>
            </div>
            <div className="border-accentText50 shadow-accentText50 flex h-2 min-h-20 w-full flex-col items-center justify-around rounded-lg border p-2 py-3 shadow-sm">
              <p className="text-accentText text-xs">{t("marketHelpDec4")}</p>
              <p className="text-mainText mt-1 text-sm">
                {`${addCommaSeparator(plMultiplier || "")} ${quote}`}
              </p>
            </div>
          </div>
          <div className="mt-6 mb-3 flex w-full flex-col items-start justify-start gap-4">
            <div className="flex items-center justify-start gap-1">
              <BsCalculator className="text-accentText text-sm" />

              <p className="text-accentText text-sm">{t("marketHelpDec10")}</p>
            </div>
            <div className="flex w-full flex-col items-center justify-start gap-1">
              <p className="text-mainText self-center text-sm">
                {t("marketHelpDec19")}
              </p>
              <div className="bg-mainText my-2 flex h-px w-[75%]"></div>
              <p className="text-mainText self-center text-sm">
                {t("marketHelpDec20")}
              </p>
            </div>
          </div>
        </div>
        <CustomButton
          onClick={onClose}
          variant="outlineNegative"
          className="!border-positive mt-4 flex w-[80px] items-center justify-center rounded-md border"
        >
          <div className="flex items-center justify-start gap-1">
            <CiSquareCheck className="text-positive h-5 w-5" />
            <p dir="rtl" className="text-positive text-justify text-xs">
              {t("gotIt")}
            </p>
          </div>
        </CustomButton>
      </div>
    </CustomDrawer>
  );
}

export default MarketHelpDrawer;
