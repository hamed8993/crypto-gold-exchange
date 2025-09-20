import { localeType } from "@/app/[locale]/layout";
import CustomSwitch from "@/components/atoms/customSwitch";
import { useTradeContext } from "@/components/pages/tradePage/provider";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { useGetExchange_dataMarkets } from "@/core/services/hooks";
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmark, IoHelpCircleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import HelpDrawer from "../helpDrawer";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
};

const TradeSettingsSideDrawer = ({ isOpen, onClose, symbol }: DrawerProps) => {
  const { locale } = useUrl();
  const t = useTranslations();
  const controls = useAnimation();

  const { setValue, watch } = useTradeContext();

  const leverage = watch("leverage");
  const isTargetPointOpen = watch("isOneTapTradeActive");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLeverageOpen, setIsLeverageOpen] = useState<boolean>(false);

  const { data: dataMarkets } = useGetExchange_dataMarkets();
  const markets = dataMarkets?.result || [];

  const symbolData = markets.filter((item) => {
    return item.symbol === symbol;
  });

  const leverages = symbolData?.[0]?.leverage || [];

  const switchTp = () => {
    if (isTargetPointOpen) {
      setValue("isOneTapTradeActive", false);
      localStorage.setItem("oneTapTrade", "false");
    } else if (!isTargetPointOpen) {
      setValue("isOneTapTradeActive", true);
      localStorage.setItem("oneTapTrade", "true");
    }
  };

  useEffect(() => {
    if (isOpen) {
      controls.start("open");
    } else {
      controls.start("closed");
    }
  }, [isOpen, controls]);

  useEffect(() => {
    if (!leverage) {
      setValue("leverage", leverages?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leverage, leverages]);

  return (
    <div
      className="bg-opacity-50 pointer-events-auto absolute inset-0 z-40 bg-black"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      style={{
        left: rtlLanguages.includes(locale as localeType) ? undefined : 0,
        right: rtlLanguages.includes(locale as localeType) ? 0 : undefined,
      }}
    >
      <motion.div
        animate={controls}
        className="bg-secondBackground xs:w-80 absolute z-50 h-full w-[280px] overflow-y-auto shadow-lg"
        dir="ltr"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={
          rtlLanguages.includes(locale as localeType)
            ? { left: 0, right: 1 }
            : { left: 1, right: 0 }
        }
        exit="closed"
        initial="closed"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onDrag={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 100) {
            onClose();
          }
        }}
        style={{
          top: 0,
          left: 0,
          right: 0,
        }}
        transition={{ type: "tween", duration: 0.3 }}
        variants={
          rtlLanguages.includes(locale as localeType)
            ? {
                open: { x: 0 },
                closed: { x: 320 },
              }
            : {
                open: { x: 0 },
                closed: { x: -320 },
              }
        }
      >
        <div className="flex h-full w-full flex-col items-start justify-start">
          <div className="flex h-16 w-full items-center justify-between px-3">
            <RxCross1 className="text-accentText h-6 w-6" onClick={onClose} />
            <p className="text-mainText text-sm">{t("settings")}</p>
          </div>
          <div className="flex min-h-16 w-full items-center justify-between px-3">
            <CustomSwitch
              color="bg-negative"
              enabled={isTargetPointOpen}
              onClick={switchTp}
            />
            <div className="flex items-center justify-start gap-1">
              <IoHelpCircleOutline
                className="text-accentText mb-3 h-5 w-5"
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
              />
              <p className="text-mainText text-lg">{t("oneTapTrade")}</p>
            </div>
          </div>
          {isTargetPointOpen ? (
            <div className="flex min-h-16 w-full items-center justify-between px-3">
              <div
                className="flex items-center justify-start gap-2"
                onClick={() => {
                  setIsLeverageOpen((prev) => !prev);
                }}
              >
                {isLeverageOpen ? (
                  <IoIosArrowUp className="text-mainText text-lg" />
                ) : (
                  <IoIosArrowDown className="text-mainText text-lg" />
                )}
                <p className="font-english text-mainText text-lg">
                  {`${leverage}X`}
                </p>
              </div>
              <p className="text-mainText text-lg">{t("leverage")}</p>
            </div>
          ) : null}

          {isTargetPointOpen &&
            isLeverageOpen &&
            leverages?.map((item: string, index: number) => {
              return (
                <div
                  className="border-accentText50 mt-2 flex min-h-14 w-[96%] items-center justify-between self-center rounded-lg border px-3"
                  key={index}
                  onClick={() => {
                    setValue("leverage", item);
                    setIsLeverageOpen(false);
                  }}
                >
                  <p className="font-english text-mainText text-sm">
                    {`${item}X`}
                  </p>
                  {leverage === item ? (
                    <IoCheckmark className="text-mainText text-lg" />
                  ) : null}
                </div>
              );
            })}
        </div>
        <HelpDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        />
      </motion.div>
    </div>
  );
};

export default TradeSettingsSideDrawer;
