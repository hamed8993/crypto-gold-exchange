/* eslint-disable @typescript-eslint/ban-ts-comment */

import { invisibleString } from "@/core/constants/constants";
import { useVisibility } from "@/core/providers/assetVisibilityProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function DashboardTopSection() {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const { isShownAssetsAmounts, setIsShownAssetsAmounts } = useVisibility();

  const toggleVisibility = () => {
    setIsShownAssetsAmounts((prev) => !prev);
  };

  const { data: dataBalance } = useGetUser_dataBalance({ enabled: isLoggedIn });

  // TODO: Fix this type after backend update
  // @ts-ignore
  const userBalance = dataBalance?.result?.main.total;

  return (
    <div className="mb-8 flex w-full items-center justify-between">
      <div className="flex h-full w-[60%] flex-col items-start">
        <div className="flex items-center justify-start gap-2">
          <p className="text-lg text-accentText dark:text-accentTextDark">
            {t("totalBalance")}
          </p>
          {isShownAssetsAmounts ? (
            <div className="flex h-10 w-10 items-center justify-center">
              <IoMdEye
                className="h-5 w-5 text-mainBrand"
                onClick={toggleVisibility}
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center">
              <IoMdEyeOff
                className="h-5 w-5 text-mainBrand"
                onClick={toggleVisibility}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-start gap-2">
          <p className="font-english text-lg text-mainText dark:text-mainTextDark">
            {isShownAssetsAmounts
              ? addCommaSeparator(userBalance || 0)
              : invisibleString}
          </p>
          <p className="text-accentText dark:text-accentTextDark">
            {t("irtSymbol")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardTopSection;
