import { localeType } from "@/app/[locale]/layout";
import PolygonIcon from "@/components/atoms/svg/polygonIcon";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { GetExchangeDataMarketsDetails } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import ChangePriceBadge from "../changePriceBadge";

interface GainerLoserCardProps {
  className?: string;
  item: ArrayElement<GetExchangeDataMarketsDetails["result"]>;
}

function GainerLoserCard({ className, item }: GainerLoserCardProps) {
  const { locale } = useUrl();
  const { theme } = useTheme();
  const { getMarketName } = useMarketsNamesData();

  return (
    <div
      className={clsx(
        "flex-center lg:flex-start border-newColor_borderNeutral10 bg-constantLight flex h-[232px] w-[226px] flex-col rounded-lg border py-8 lg:w-[233px] 2xl:w-[255px] ltr:pr-[21px] ltr:pl-8 rtl:pr-8 rtl:pl-[21px]",
        className,
      )}
    >
      <div className="relative h-10 w-10">
        <PolygonIcon color={theme === "dark" ? "#D8DDE3" : "#1B264F"} />
        <Image
          width={26}
          height={26}
          alt="symbol Image"
          src={`/icon-158.png`}
          className="absolute top-1/2 left-1/2 h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 transform rounded-full"
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-textSecondary text-[12px] font-semibold">
          {getMarketName(item?.symbol)[locale as localeType]}
        </span>
        <ChangePriceBadge changePrice={item?.change_percentage || "0"} />
      </div>
      <span className="font-english text-newColor_textNeutral100 my-1 text-[28px] font-semibold">
        {addCommaSeparator(item?.last_price)}
      </span>
      <span className="text-newColor_textNeutral100 text-[12px] font-normal">
        {`${item?.base}/${item?.quote}`.toUpperCase()}
      </span>
    </div>
  );
}

export default GainerLoserCard;
