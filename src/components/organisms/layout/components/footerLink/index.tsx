import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface FooterLinkProps {
  href: string;
  text: string;
  extraHref?: string;
  icon: ReactNode;
  isLink?: boolean;
  onClick?: () => void;
}

function FooterLink({
  href,
  icon,
  text,
  isLink = true,
  onClick,
  extraHref = "///",
}: FooterLinkProps) {
  const { isActive, locale } = useUrl();

  return isLink ? (
    <Link
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-1",
        isActive(href) ? "border-t-2 border-t-negative" : "",
      )}
      href={`/${locale}${href}`}
      prefetch
    >
      {icon}
      <span
        className={clsx(
          "text-[11px] leading-none",
          isActive(href) || isActive(extraHref)
            ? "text-mainText dark:text-mainTextDark"
            : "text-accentText dark:text-accentTextDark",
        )}
      >
        {text}
      </span>
    </Link>
  ) : (
    <button
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-1",
        isActive(href) ? "border-t-2 border-t-negative" : "",
      )}
      onClick={onClick}
    >
      {icon}
      <span
        className={clsx(
          "text-[11px] leading-none",
          isActive(href)
            ? "text-mainText dark:text-mainTextDark"
            : "text-accentText dark:text-accentTextDark",
        )}
      >
        {text}
      </span>
    </button>
  );
}

export default FooterLink;
