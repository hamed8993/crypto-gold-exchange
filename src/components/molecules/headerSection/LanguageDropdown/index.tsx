import CustomDropdown from "@/components/atoms/customDropdown";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { BiCheck, BiChevronDown } from "react-icons/bi";

interface LanguageDropdownProps {
  hasScrolled?: boolean;
  hasHeaderBg?: boolean;
}

const LanguageDropdown = ({
  hasScrolled,
  hasHeaderBg,
}: LanguageDropdownProps) => {
  const { locale, pathname } = useUrl();
  const { replace } = useRouter();

  return (
    <div className="flex items-center gap-2 ps-4">
      <CustomDropdown
        toggler={
          <>
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
              {locale === "en" ? (
                <span className="fi fi-sh"></span>
              ) : locale === "ru" ? (
                <span className="fi fi-ru"></span>
              ) : locale === "tr" ? (
                <span className="fi fi-tr"></span>
              ) : locale === "ar" ? (
                <span className="fi fi-sa"></span>
              ) : (
                <span className="fi fi-ir"></span>
              )}
            </div>
            <p
              className={clsx(
                hasHeaderBg && !hasScrolled
                  ? "text-mainTextDark dark:text-mainTextDark"
                  : "text-mainText dark:text-mainTextDark",
              )}
            >
              {locale === "en" ? "English" : "فارسی"}
            </p>
            <BiChevronDown
              className={clsx(
                hasHeaderBg && !hasScrolled
                  ? "text-mainTextDark dark:text-mainTextDark"
                  : "text-mainText dark:text-mainTextDark",
              )}
              size={24}
            />
          </>
        }
        className="-bottom-3! start-[unset]! end-6"
      >
        <div className="grid w-[700px] grid-cols-2 rounded-xl bg-mainBackground p-6 text-sm dark:bg-mainBackgroundDark">
          <div
            className="flex h-14 w-80 cursor-pointer items-center justify-between gap-2 rounded-md px-2 pe-5 hover:bg-blue-400/20"
            onClick={() => replace(pathname.replace("/fa", "/en"))}
          >
            <div className="flex h-full items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-contain">
                <span className="fi fi-sh"></span>
              </div>
              <p className="text-mainText dark:text-mainTextDark">English</p>
            </div>
            {locale === "en" && (
              <BiCheck
                className="text-mainText dark:text-mainTextDark"
                size={24}
              />
            )}
          </div>
          <div
            className="flex h-14 w-80 cursor-pointer items-center justify-between gap-2 rounded-md px-2 pe-5 hover:bg-blue-400/20"
            onClick={() => replace(pathname.replace("/en", "/fa"))}
          >
            <div className="flex h-full items-center gap-2">
              <div className="h-6 w-6 rounded-full">
                <span className="fi fi-ir"></span>
              </div>
              <p className="text-mainText dark:text-mainTextDark">فارسی</p>
            </div>
            {locale === "fa" && (
              <BiCheck
                className="text-mainText dark:text-mainTextDark"
                size={24}
              />
            )}
          </div>
          <div
            className="flex h-14 w-80 cursor-pointer items-center justify-between gap-2 rounded-md px-2 pe-5 hover:bg-blue-400/20"
            onClick={() => replace(pathname.replace("/fa", "/en"))}
          >
            <div className="flex h-full items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-contain">
                <span className="fi fi-ru"></span>
              </div>
              <p className="text-mainText dark:text-mainTextDark">Русский</p>
            </div>
            {locale === "ru" && (
              <BiCheck
                className="text-mainText dark:text-mainTextDark"
                size={24}
              />
            )}
          </div>
          <div
            className="flex h-14 w-80 cursor-pointer items-center justify-between gap-2 rounded-md px-2 pe-5 hover:bg-blue-400/20"
            onClick={() => replace(pathname.replace("/en", "/fa"))}
          >
            <div className="flex h-full items-center gap-2">
              <div className="h-6 w-6 rounded-full">
                <span className="fi fi-sa"></span>
              </div>
              <p className="text-mainText dark:text-mainTextDark">العربية</p>
            </div>
            {locale === "ar" && (
              <BiCheck
                className="text-mainText dark:text-mainTextDark"
                size={24}
              />
            )}
          </div>
          <div
            className="flex h-14 w-80 cursor-pointer items-center justify-between gap-2 rounded-md px-2 pe-5 hover:bg-blue-400/20"
            onClick={() => replace(pathname.replace("/fa", "/en"))}
          >
            <div className="flex h-full items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-contain">
                <span className="fi fi-tr"></span>
              </div>
              <p className="text-mainText dark:text-mainTextDark">Türkçe</p>
            </div>
            {locale === "tr" && (
              <BiCheck
                className="text-mainText dark:text-mainTextDark"
                size={24}
              />
            )}
          </div>
        </div>
      </CustomDropdown>
    </div>
  );
};

export default LanguageDropdown;
