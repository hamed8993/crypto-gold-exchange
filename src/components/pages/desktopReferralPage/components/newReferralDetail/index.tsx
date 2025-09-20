import CustomSlider from "@/components/atoms/customSlider";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

interface NewReferralDetailProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

function NewReferralDetail({ setValue, value }: NewReferralDetailProps) {
  const t = useTranslations();
  return (
    <>
      <div className="mt-5 flex w-full items-center justify-between">
        <p className="text-accentText text-justify text-xs">
          {t("yourShareNewLink")}
        </p>
        <p className="font-english text-mainText text-justify text-base">
          {`${"%"} ${value}`}
        </p>
      </div>
      <div className="mt-3 mb-10 flex w-full items-center justify-between">
        <p className="text-accentText text-justify text-xs">
          {t("subsetShareNewLink")}
        </p>
        <p className="font-english text-mainText text-justify text-base">
          {`${"%"} ${30 - value}`}
        </p>
      </div>
      <div className="flex w-full items-center justify-center px-3">
        <CustomSlider
          dir="rtl"
          max={30}
          value={value}
          min={0}
          step={1}
          onChange={setValue}
        />
      </div>
    </>
  );
}

export default NewReferralDetail;
