import CustomSwitch from "@/components/atoms/customSwitch";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

interface ToggleButtonProps {
  isChartReady: boolean;
  setIsChartReady: Dispatch<SetStateAction<boolean>>;
}

function ToggleButton({ isChartReady, setIsChartReady }: ToggleButtonProps) {
  const t = useTranslations();
  return (
    <div className="mb-4 flex h-10 w-48! items-start justify-start">
      <div className="mt-2 flex h-8 w-48! items-start justify-center gap-4 pt-1">
        <p className="text-mainText text-[12px]">{t("oneTapTrade")}</p>
        <CustomSwitch
          onClick={() => {
            setIsChartReady((prev) => !prev);
          }}
          enabled={isChartReady}
        />
      </div>
    </div>
  );
}

export default ToggleButton;
