"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { IoChevronForward } from "react-icons/io5";

interface SettingsItemProps {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
  iconClassName?: string;
}

function SettingsItem({
  icon,
  text,
  onClick,
  iconClassName,
}: SettingsItemProps) {
  return (
    <div
      className="flex min-h-12 cursor-pointer items-center justify-between px-2 py-1"
      onClick={onClick}
    >
      <span className="mx-2 flex items-center gap-2">
        {icon ? (
          <span
            className={clsx(
              "flex min-h-8 min-w-8 items-center justify-center rounded-lg",
              iconClassName,
            )}
          >
            {icon}
          </span>
        ) : null}
        <span className="text-mainText text-xs">{text}</span>
      </span>
      <span className="flex min-h-10 min-w-10 items-center justify-center">
        <IoChevronForward className="text-accentText rtl:rotate-180" />
      </span>
    </div>
  );
}

export default SettingsItem;
