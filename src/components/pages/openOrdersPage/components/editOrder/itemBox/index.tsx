import clsx from "clsx";
import { ReactNode } from "react";

interface ItemBoxProps {
  title: string;
  value?: string | ReactNode;
  valueClassName?: string;
}

function ItemBox({ title, value, valueClassName }: ItemBoxProps) {
  return (
    <div className="flex h-7 w-full items-start justify-start gap-1">
      <p className="text-accentText text-xs">{title}:</p>
      <span className={clsx("text-mainText text-xs", valueClassName)}>
        {value}
      </span>
    </div>
  );
}

export default ItemBox;
