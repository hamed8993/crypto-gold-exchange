import CustomInput from "@/components/atoms/customInput";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

interface TitleInputProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

const TitleInput = ({ setTitle, title }: TitleInputProps) => {
  const t = useTranslations();

  return (
    <div className="border-accentText50 relative mt-8 flex h-14 w-full items-center justify-between rounded-lg border">
      <div
        className={
          "bg-surface absolute -top-5 right-1 z-1 flex items-center justify-center px-5 py-2"
        }
      >
        <label className="text-mainText mx-2 text-xs">{t("title")}</label>
      </div>
      <CustomInput
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder={t("enterTitle")}
        wrapperClassName="px-2"
        inputClassName={
          "w-full placeholder:text-xs! text-base! border-none z-2"
        }
        maxLength={100}
      />
    </div>
  );
};

export default TitleInput;
