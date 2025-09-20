import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiExternalLinkLine } from "react-icons/ri";

type LinkDataItem = {
  href: string;
  text: string;
};

interface AlertBoxNewProps {
  color?: string;
  data: Array<string>;
  icon?: ReactNode;
  linkData?: Array<LinkDataItem>;
  wrapperClassName?: string;
  wrappedRowClassName?: string;
  linkItemTextClassName?: string;
  ItemTextClassName?: string;
}

function AlertBoxNew({
  color,
  data,
  icon,
  linkData,
  wrapperClassName,
  wrappedRowClassName,
  linkItemTextClassName,
  ItemTextClassName,
}: AlertBoxNewProps) {
  return (
    <div
      className={clsx(
        color
          ? `bg-paleBackgroundBlue dark:bg-surfaceDark flex h-fit w-full flex-col items-start justify-start gap-3 px-6 py-5`
          : "border-paleBorderBlue bg-paleBackgroundBlue dark:bg-surfaceDark flex h-fit w-full flex-col items-start justify-start gap-3 rounded-2xl border px-6 py-5 dark:border-accentTextDark50",
        wrapperClassName,
      )}
    >
      {data?.map((item, index) => {
        return (
          <div
            className={clsx(
              "flex items-start justify-start gap-2",
              wrappedRowClassName,
            )}
            key={index}
          >
            {icon ? (
              icon
            ) : (
              <Image
                alt="info"
                src={"/assets/images/info-circle.svg"}
                width={18}
                height={18}
                className={
                  color
                    ? `min-h-6 min-w-6 translate-y-1 text-${color}`
                    : "min-h-6 min-w-6 translate-y-1 text-mainText dark:text-mainTextDark"
                }
              />
            )}
            <p
              className={clsx(
                "text-justify text-xs leading-8 text-mainText dark:text-mainTextDark",
                ItemTextClassName,
              )}
            >
              {item}
            </p>
          </div>
        );
      })}
      {linkData?.map((item, index) => {
        return (
          <Link
            className="flex items-start justify-start gap-2"
            href={item?.href}
            key={index}
          >
            <div className="flex items-center justify-start gap-2">
              <RiExternalLinkLine className="text-lg text-mainBrandAlternative" />
              <p
                className={clsx(
                  "text-justify text-[11px]/5 text-mainBrandAlternative",
                  linkItemTextClassName,
                )}
              >
                {item.text}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default AlertBoxNew;
