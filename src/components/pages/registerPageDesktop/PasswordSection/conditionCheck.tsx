import usePasswordValidate from "@/core/hooks/usePasswordValidate";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface PasswordConditionSectionProps {
  password: string;
}

function PasswordConditionSection({ password }: PasswordConditionSectionProps) {
  const t = useTranslations();

  const {
    checkCharacterLength,
    checkHasLowercase,
    checkHasNumber,
    checkHasUppercase,
  } = usePasswordValidate({ password });

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex h-14 w-full items-center justify-start">
        <div className="flex min-h-14 w-[30%] flex-col items-start justify-around">
          <div className="flex items-center gap-2">
            {checkCharacterLength() ? (
              // <IoCheckmarkDone className="text-mainBrand" />
              <div className="bg-mainBrand flex h-4 w-[2px] rounded-full"></div>
            ) : (
              <div className="bg-accentText flex h-4 w-[2px] rounded-full"></div>

              // <IoCheckmark className="text-accentText " />
            )}
            <span
              className={clsx(
                "text-xs",
                checkCharacterLength() ? "text-mainBrand" : "text-accentText",
              )}
            >
              {t("atLeast8characters")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {checkHasNumber() ? (
              // <IoCheckmarkDone className="text-mainBrand" />
              <div className="bg-mainBrand flex h-4 w-[2px] rounded-full"></div>
            ) : (
              <div className="bg-accentText flex h-4 w-[2px] rounded-full"></div>
              // <IoCheckmark className="text-accentText " />
            )}
            <span
              className={clsx(
                "text-xs",
                checkHasNumber() ? "text-mainBrand" : "text-accentText",
              )}
            >
              {t("includeNumber")}
            </span>
          </div>
        </div>
        <div className="flex min-h-14 w-[30%] flex-col items-start justify-around">
          <div className="flex items-center gap-2">
            {checkHasLowercase() ? (
              // <IoCheckmarkDone className="text-mainBrand" />
              <div className="bg-mainBrand flex h-4 w-[2px] rounded-full"></div>
            ) : (
              <div className="bg-accentText flex h-4 w-[2px] rounded-full"></div>
              // <IoCheckmark className="text-accentText " />
            )}
            <span
              className={clsx(
                "text-xs",
                checkHasLowercase() ? "text-mainBrand" : "text-accentText",
              )}
            >
              {t("lowercaseCharacter")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {checkHasUppercase() ? (
              // <IoCheckmarkDone className="text-mainBrand" />
              <div className="bg-mainBrand flex h-4 w-[2px] rounded-full"></div>
            ) : (
              <div className="bg-accentText flex h-4 w-[2px] rounded-full"></div>
              // <IoCheckmark className="text-accentText " />
            )}
            <span
              className={clsx(
                "text-xs",
                checkHasUppercase() ? "text-mainBrand" : "text-accentText",
              )}
            >
              {t("uppercaseCharacter")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordConditionSection;
