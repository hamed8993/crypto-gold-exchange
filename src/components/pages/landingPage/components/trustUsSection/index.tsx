import clsx from "clsx";
import { useTranslations } from "next-intl";
import HighlightSectionTrustUs from "./components/highlightSectionTrustUs";

interface TrustUsSectionProps {
  containerClassName?: string;
}

function TrustUsSection({ containerClassName }: TrustUsSectionProps) {
  const t = useTranslations();

  const elementsList = [
    {
      title: t("trustUsSec-item1-title"),
      amount: 10,
      subTitle: t("trustUsSec-item1-subTitle"),
    },
    {
      title: t("trustUsSec-item2-title"),
      amount: 984,
      subTitle: t("trustUsSec-item2-subTitle"),
    },
    {
      title: t("trustUsSec-item3-title"),
      amount: 20,
      subTitle: t("trustUsSec-item3-subTitle"),
    },
    {
      title: t("trustUsSec-item4-title"),
      amount: 12,
      subTitle: t("trustUsSec-item4-subTitle"),
    },
  ];

  return (
    <div
      className={clsx(
        "bg-newColor_bgNavy100 bg-line-pattern-dark flex flex-col items-center justify-center gap-[46px] bg-repeat py-[96px]",
        containerClassName,
      )}
    >
      <HighlightSectionTrustUs className="w-full bg-transparent lg:w-[88%] 2xl:w-1/2" />
      <div className="flex w-full items-center">
        <span className="bg-newColor_borderSolid inline-block h-px w-full"></span>
        <div className="border-newColor_borderSolid bg-newColor_bgGraySolid bg-line-pattern-dark flex w-fit min-w-fit gap-[10px] rounded-xl border bg-repeat p-[10px]">
          {elementsList?.map((item) => (
            <div
              key={item?.title}
              className="border-newColor_borderSolid bg-newColor_bgPrimary50 flex h-[110px] w-[167px] flex-col gap-1 rounded-lg border p-4 lg:h-[91px] lg:w-[233px] 2xl:w-[276px]"
            >
              <p className="text-constantLight flex items-center gap-1 text-2xl font-semibold">
                <span className="font-english">{item?.amount}</span>
                <span>{item?.title}</span>
              </p>
              <p className="text-newColor_textNeutral40 text-xs font-semibold">
                {item?.subTitle}
              </p>
            </div>
          ))}
        </div>
        <span className="bg-newColor_borderSolid inline-block h-px w-full"></span>
      </div>
    </div>
  );
}

export default TrustUsSection;
