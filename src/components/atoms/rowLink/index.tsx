"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import useUrl from "@/core/hooks/useUrl";
import { IoChevronForward } from "react-icons/io5";

interface RowLinkProps {
  href: string;
  text: string;
  icon?: ReactNode;
  iconClassName?: string;
}

function RowLink({ href, icon, iconClassName, text }: RowLinkProps) {
  const { locale } = useUrl();

  return (
    <Link
      className="flex min-h-12 items-center justify-between px-2 py-1"
      href={`/${locale}${href}`}
      prefetch
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
        <span className="text-xs text-mainText dark:text-mainTextDark">
          {text}
        </span>
      </span>
      <span className="flex min-h-10 min-w-10 items-center justify-center">
        <IoChevronForward className="text-accentText rtl:rotate-180 dark:text-accentTextDark" />
      </span>
    </Link>
  );
}

export default RowLink;
