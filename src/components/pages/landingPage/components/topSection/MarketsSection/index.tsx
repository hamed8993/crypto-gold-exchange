import { localeType } from "@/app/[locale]/layout";
import { RoutesName } from "@/core/constants/routes";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useMarketsData } from "@/core/hooks/useMarkets";
import useUrl from "@/core/hooks/useUrl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import Link from "next/link";

const MarketsSection = () => {
  const { locale } = useUrl();

  const { getMarketName } = useMarketsNamesData();

  const { markets } = useMarketsData();

  return (
    <div className="x mt-80 flex w-screen flex-col items-center gap-5">
      <div className="mx-auto flex w-fit max-w-[90%] items-center gap-6 overflow-x-auto">
        {markets.map((item) => {
          return (
            <Link
              className="animate-fadeUp30 bg-landingSecondarySurface flex min-w-[200px] cursor-pointer items-center justify-start gap-5 rounded-xl p-4 opacity-0"
              href={`/${locale}${RoutesName.trade}/${item.base}-${item.quote}`}
              key={item.symbol}
              style={{ animationDelay: "250ms" }}
            >
              <div className="flex w-full flex-col items-start">
                <span className="text-constantLight text-base">
                  {getMarketName(item.symbol)[locale as localeType]}
                </span>
                <div className="flex w-full items-center justify-between">
                  <span className="font-english text-accentText text-sm">
                    {`${item.base.toUpperCase()} / ${item.quote.toUpperCase()}`}
                  </span>
                  <span
                    className={clsx(
                      "font-english text-sm font-normal",
                      Number(item.change_percentage) > 0
                        ? "text-positive50"
                        : Number(item.change_percentage) < 0
                          ? "text-negative"
                          : "text-accentText",
                    )}
                  >
                    {addCommaSeparator(item.last_price)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MarketsSection;
