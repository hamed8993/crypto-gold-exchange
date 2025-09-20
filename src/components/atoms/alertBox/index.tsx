import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import { MdInfo } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";

type LinkDataItem = {
  href: string;
  text: string;
};

interface AlertBoxProps {
  color?: string;
  data: Array<string>;
  icon?: ReactNode;
  linkData?: Array<LinkDataItem>;
  wrapperClassName?: string;
}

function AlertBox({
  color,
  data,
  icon,
  linkData,
  wrapperClassName,
}: AlertBoxProps) {
  return (
    <div
      className={clsx(
        color
          ? `mt-4 flex h-fit w-full flex-col items-start justify-start gap-3 bg-transparent p-3 py-5`
          : "mt-4 flex h-fit w-full flex-col items-start justify-start gap-3 rounded-md border border-accentText50 bg-transparent p-3 py-5 dark:border-accentTextDark50",
        wrapperClassName,
      )}
    >
      {data.map((item, index) => {
        return (
          <div className="flex items-start justify-start gap-2" key={index}>
            {icon ? (
              icon
            ) : (
              <MdInfo
                className={
                  color
                    ? `min-h-4 min-w-4 text-${color}`
                    : "min-h-4 min-w-4 text-accentText dark:text-accentTextDark"
                }
              />
            )}
            <p className="text-justify text-[11px]/5 text-accentText dark:text-accentTextDark">
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
              <p className="text-justify text-[11px]/5 text-mainBrandAlternative">
                {item.text}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default AlertBox;
