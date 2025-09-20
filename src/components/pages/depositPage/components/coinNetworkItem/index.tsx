import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";

interface CoinNetworkItemProps {
  onClick: () => void;
  title: string;
  description: string;
  src: string;
}

function CoinNetworkItem({
  onClick,
  description,
  title,
  src,
}: CoinNetworkItemProps) {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div
        className="mt-2 flex h-fit w-full items-center justify-between p-4"
        onClick={onClick}
      >
        <div className="flex items-center justify-start gap-4">
          <Image alt="google authenticator" height={30} src={src} width={30} />
          <div className="flex h-full flex-col items-start justify-between">
            <p className="text-xs text-mainText dark:text-mainTextDark">
              {title}
            </p>
            <p className="text-xs text-accentText dark:text-accentTextDark">
              {description}
            </p>
          </div>
        </div>

        <div className="flex h-8 w-8 items-center justify-center">
          <FiChevronLeft className="h-4 w-4 text-accentText ltr:rotate-180 dark:text-accentTextDark" />
        </div>
      </div>
      <div className="flex h-px w-[96%] bg-accentText50 dark:bg-accentTextDark50"></div>
    </div>
  );
}

export default CoinNetworkItem;
