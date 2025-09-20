import BalanceItem from "@/components/pages/dashboardPage/components/balance/components/balanceItem";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { RiAlignItemRightFill } from "react-icons/ri";

function WalletInfo() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { data } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const irtMarginBalance =
    data?.result?.margin?.find((itm) => itm.coin === "irt")?.available || "";
  const usdMarginBalance =
    data?.result?.margin?.find((itm) => itm.coin === "usd")?.available || "";
  const irtMainBalance =
    data?.result?.main?.find((itm) => itm.coin === "irt")?.available || "";
  const usdMainBalance =
    data?.result?.main?.find((itm) => itm.coin === "usd")?.available || "";

  return isLoggedIn ? (
    <div className="sticky top-14 flex min-h-32 px-3 w-screen max-w-full flex-col items-center justify-between gap-1 bg-secondBackground dark:bg-secondBackgroundDark">
      <div className="flex w-full p-3 rounded-lg  flex-col items-start justify-start px-2">
        <div className="flex w-full items-center justify-start gap-1">
          <RiAlignItemRightFill size={18} color="#2e7d32" />
          <p className="text-[12px] text-mainText dark:text-mainTextDark">
            {t("irtAccount")}
          </p>
        </div>
        <div className="mt-2 flex w-full items-center justify-between gap-2">
          <BalanceItem
            quoteClassName="text-[10px]!"
            titleClassName="text-[10px]!"
            valueClassName="text-[14px]!"
            quote={"irt"}
            title={t("base")}
            value={irtMainBalance}
          />
          <BalanceItem
            quote={"irt"}
            title={t("margin")}
            quoteClassName="text-[10px]!"
            titleClassName="text-[10px]!"
            valueClassName="text-[14px]!"
            value={irtMarginBalance}
          />
        </div>
      </div>
      <div className="flex w-[94%] bg-accentText50 dark:bg-accentTextDark50  h-px" />
      <div className="mb-2 p-3 rounded-lg flex w-full flex-col items-start justify-start px-2">
        <div className="flex w-full items-center justify-start gap-1">
          <RiAlignItemRightFill size={18} color="#0d77e7" />
          <p className="text-[12px] text-mainText dark:text-mainTextDark">
            {t("usdAccount")}
          </p>
        </div>
        <div className="mt-2 flex w-full items-center justify-between gap-2">
          <BalanceItem
            quoteClassName="text-[10px]!"
            titleClassName="text-[10px]!"
            valueClassName="text-[14px]!"
            quote={"usd"}
            title={t("base")}
            value={usdMainBalance}
          />
          <BalanceItem
            quoteClassName="text-[10px]!"
            titleClassName="text-[10px]!"
            valueClassName="text-[14px]!"
            quote={"usd"}
            title={t("margin")}
            value={usdMarginBalance}
          />
        </div>
      </div>

      {/* <div className="flex h-16 w-full items-center justify-between">
        <div className="flex h-16 w-[50%] flex-col items-start justify-center gap-1 px-3">
          <p className="font-english text-xs text-mainText dark:text-mainTextDark">
            {addCommaSeparator(irtMarginBalance || "0")}
          </p>
          <p className="text-xs text-accentText dark:text-accentTextDark">
            {`${t("marginBalance")} ${t("irtiSymbol")}`}
          </p>
        </div>

        <div className="flex h-[70%] w-px bg-accentText50 dark:bg-accentTextDark50"></div>

        <div className="flex h-16 w-[50%] flex-col items-end justify-center gap-1 px-3">
          <p className="font-english text-xs text-mainText dark:text-mainTextDark">
            {addCommaSeparator(usdMarginBalance || "0")}
          </p>
          <p className="text-xs text-accentText dark:text-accentTextDark">
            {`${t("marginBalance")} ${t("usdSymbol")}`}
          </p>
        </div>
      </div>
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex h-16 w-[50%] flex-col items-start justify-center gap-1 px-3">
          <p className="font-english text-xs text-mainText dark:text-mainTextDark">
            {addCommaSeparator(irtMainBalance || "0")}
          </p>
          <p className="text-xs text-accentText dark:text-accentTextDark">
            {`${t("mainBalance")} ${t("irtiSymbol")}`}
          </p>
        </div>

        <div className="flex h-[70%] w-px bg-accentText50 dark:bg-accentTextDark50"></div>

        <div className="flex h-16 w-[50%] flex-col items-end justify-center gap-1 px-3">
          <p className="font-english text-xs text-mainText dark:text-mainTextDark">
            {addCommaSeparator(usdMainBalance || "0")}
          </p>
          <p className="text-xs text-accentText dark:text-accentTextDark">
            {`${t("mainBalance")} ${t("usdSymbol")}`}
          </p>
        </div>
      </div> */}
    </div>
  ) : null;
}

export default WalletInfo;
