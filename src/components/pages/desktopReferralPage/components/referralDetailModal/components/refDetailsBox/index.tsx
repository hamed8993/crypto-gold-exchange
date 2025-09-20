import { ArrayElement } from "@/core/constants/constants";
import { useTranslations } from "next-intl";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { RiDiscountPercentLine } from "react-icons/ri";
import { SiMoneygram } from "react-icons/si";
import RefItem from "../refItem";

interface RefDetailsBoxProps {
  item?: ArrayElement<
    {
      code: string;
      income: string;
      referrerShare: string;
      subsetCount: string;
      subsetShare: string;
    }[]
  >;
}

function RefDetailsBox({ item }: RefDetailsBoxProps) {
  const t = useTranslations();

  return (
    <div className="bg-mainBackground my-3 flex w-[90%] flex-col items-center justify-start rounded-lg">
      <RefItem Icon={SiMoneygram} title={t("income")} value={item?.income} />

      <RefItem
        Icon={RiDiscountPercentLine}
        title={t("yourShareCount")}
        value={`${item?.referrerShare}%`}
      />
      <RefItem
        Icon={RiDiscountPercentLine}
        title={t("subsetShareCount")}
        value={`${item?.subsetShare}%`}
      />

      <RefItem
        Icon={IoPeopleCircleOutline}
        title={t("totalReferralsCount")}
        value={item?.subsetCount}
      />
    </div>
  );
}

export default RefDetailsBox;
