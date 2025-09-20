import clsx from "clsx";
import { useTranslations } from "next-intl";
interface SideInputProps {
  setIsLongOrShort: (value: "long" | "short") => void;
  isLongOrShort: string;
}

function SideInput({ setIsLongOrShort, isLongOrShort }: SideInputProps) {
  const t = useTranslations();

  return (
    <div className="bg-surface mt-2 flex w-full flex-col items-center justify-start">
      <div className="flex w-full items-center justify-between p-1 px-2">
        <p className="text-mainText w-[30%] max-w-[30%] text-sm">
          {t("orderType")}
        </p>
        <div className="bg-secondBackground flex h-10 w-40 items-center justify-between gap-2 rounded-lg px-1">
          <div
            className={clsx(
              "flex h-8 w-full items-center justify-center rounded-lg",
              isLongOrShort === "long" ? "bg-positive" : "bg-transparent",
            )}
            onClick={() => {
              setIsLongOrShort("long");
            }}
          >
            <p
              className={
                isLongOrShort === "long"
                  ? "text-xs text-white"
                  : "text-mainText text-xs"
              }
            >
              {t("long")}
            </p>
          </div>
          <div
            className={clsx(
              "flex h-8 w-full items-center justify-center rounded-lg",
              isLongOrShort === "short" ? "bg-negative" : "bg-transparent",
            )}
            onClick={() => {
              setIsLongOrShort("short");
            }}
          >
            <p
              className={
                isLongOrShort === "short"
                  ? "text-xs text-white"
                  : "text-mainText text-xs"
              }
            >
              {t("short")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideInput;
