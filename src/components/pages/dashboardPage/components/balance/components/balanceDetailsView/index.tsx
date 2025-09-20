import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { RiAlignItemRightFill } from "react-icons/ri";
import BalanceItem from "../balanceItem";

interface BalanceDetailsViewProps {
  isDrawerOpen: boolean;
}

function BalanceDetailsView({ isDrawerOpen }: BalanceDetailsViewProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const { data: balanceData } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const marginWallet = balanceData?.result?.margin || [];
  const mainWallet = balanceData?.result?.main || [];

  const mainUsdtWallet =
    mainWallet?.find((item) => item.coin === "usd")?.available || 0;
  const mainIrtWallet =
    mainWallet?.find((item) => item.coin === "irt")?.available || 0;
  const marginIrtBalance =
    marginWallet?.find((item) => item.coin === "irt")?.available || 0;
  const marginUsdtWallet =
    marginWallet?.find((item) => item.coin === "usd")?.available || 0;

  return (
    <AnimatePresence>
      (
      {isDrawerOpen ? (
        <motion.div
          key="content"
          className="flex w-full flex-col items-center justify-start px-2"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex w-full flex-col items-start justify-start rounded-lg bg-surface p-3 px-2 dark:bg-surfaceDark">
            <div className="flex w-full items-center justify-start gap-1">
              <RiAlignItemRightFill size={18} color="#2e7d32" />
              <p className="text-sm text-mainText dark:text-mainTextDark">
                {t("irtAccount")}
              </p>
            </div>
            <div className="mt-2 flex w-full items-center justify-between gap-2">
              <BalanceItem
                quote={"irt"}
                title={t("base")}
                value={mainIrtWallet || ""}
              />
              <BalanceItem
                quote={"irt"}
                title={t("margin")}
                value={marginIrtBalance || ""}
              />
            </div>
          </div>
          <div className="mb-2 mt-2 flex w-full flex-col items-start justify-start rounded-lg bg-surface p-3 px-2 dark:bg-surfaceDark">
            <div className="flex w-full items-center justify-start gap-1">
              <RiAlignItemRightFill size={18} color="#0d77e7" />
              <p className="text-sm text-mainText dark:text-mainTextDark">
                {t("usdAccount")}
              </p>
            </div>
            <div className="mt-2 flex w-full items-center justify-between gap-2">
              <BalanceItem
                quote={"usd"}
                title={t("base")}
                value={mainUsdtWallet || ""}
              />
              <BalanceItem
                quote={"usd"}
                title={t("margin")}
                value={marginUsdtWallet || ""}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
      )
    </AnimatePresence>
  );
}

export default BalanceDetailsView;
