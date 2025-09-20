import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { FiPlus } from "react-icons/fi";

interface TradeCircleButtonProps {
  setIsSecondPage: () => void;
}

function TradeCircleButton({ setIsSecondPage }: TradeCircleButtonProps) {
  const { locale } = useUrl();

  return (
    <div
      className="fixed flex h-12 w-12 items-center justify-center rounded-full bg-positive"
      onClick={() => {
        setIsSecondPage();
      }}
      style={{
        bottom: 90,
        left: rtlLanguages.includes(locale as localeType) ? 20 : undefined,
        right: rtlLanguages.includes(locale as localeType) ? undefined : 20,
      }}
    >
      <FiPlus className="h-6 w-6 text-white" />
    </div>
  );
}

export default TradeCircleButton;
