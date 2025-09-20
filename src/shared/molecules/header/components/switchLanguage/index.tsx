import CustomDropdown from "@/components/atoms/customDropdown";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

type LanguageItemType = {
  locale: string;
  languageName: string;
  replaceFunction: () => void;
  flag: ReactNode;
};

interface SwitchLanguageProps {
  containerClassName?: string;
}

const SwitchLanguage = ({ containerClassName }: SwitchLanguageProps) => {
  const { locale, pathname } = useUrl();
  const { replace } = useRouter();

  const languagesList: LanguageItemType[] = [
    {
      locale: "en",
      languageName: "English",
      replaceFunction: () => replace(pathname.replace("/fa", "/en")),
      flag: <span className="fi fi-sh"></span>,
    },
    {
      locale: "fa",
      languageName: "فارسی",
      replaceFunction: () => replace(pathname.replace("/en", "/fa")),
      flag: <span className="fi fi-ir"></span>,
    },
    {
      locale: "ru",
      languageName: "Русский",
      replaceFunction: () => replace(pathname.replace("/fa", "/en")),
      flag: <span className="fi fi-ru"></span>,
    },
    {
      locale: "ar",
      languageName: "العربية",
      replaceFunction: () => replace(pathname.replace("/en", "/fa")),
      flag: <span className="fi fi-sa"></span>,
    },

    {
      locale: "tr",
      languageName: "Türkçe",
      replaceFunction: () => replace(pathname.replace("/fa", "/en")),
      flag: <span className="fi fi-tr"></span>,
    },
  ];

  return (
    <div className={clsx("flex items-center gap-2 ps-4", containerClassName)}>
      <CustomDropdown
        toggler={
          <>
            <p className="text-textPrimary text-sm font-semibold">
              {locale === "en" ? "English" : "فارسی"}
            </p>
            <BiChevronDown className="text-textPrimary ms-1" />
          </>
        }
        className="start-[unset]! end-6 right-0 -bottom-3! left-0 z-11 lg:left-auto lg:ltr:right-[-85px] lg:rtl:left-[-85px]"
      >
        <div className="bg-mainBackground grid w-[700px] grid-cols-2 rounded-xl p-6 text-sm">
          {languagesList?.map((item: LanguageItemType) => (
            <div
              key={item?.locale}
              className="flex h-14 w-80 cursor-pointer items-center justify-between gap-2 rounded-md px-2 pe-5 hover:bg-blue-400/20"
              onClick={item?.replaceFunction}
            >
              <div className="flex h-full items-center gap-2">
                <div className="h-6 w-6 overflow-hidden rounded-full bg-contain">
                  {item?.flag}
                </div>
                <p className="text-mainText">{item?.languageName}</p>
              </div>
              {locale === item?.locale && (
                <BiCheck className="text-mainText" size={24} />
              )}
            </div>
          ))}
        </div>
      </CustomDropdown>
    </div>
  );
};

export default SwitchLanguage;
