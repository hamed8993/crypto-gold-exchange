"use client";

import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  variant?:
    | "primary"
    | "negative"
    | "textNegative"
    | "textPositive"
    | "landing";
}

function ButtonLink({
  children,
  className,
  href,
  onClick,
  variant = "primary",
}: ButtonLinkProps) {
  const { locale } = useUrl();

  function getVariantBaseClassName() {
    if (variant === "landing") {
      return "bg-landingMainBrand text-white dark:bg-landingMainBrandDark transition-colors duration-300 hover:bg-landingMainBrand/80 dark:hover:bg-landingMainBrandDark/80";
    }
    if (variant === "textPositive") {
      return "bg-transparent text-positive dark:text-positiveDark border border-accentText/50 dark:border-accentTextDark/50 transition-colors duration-300 hover:bg-accentText/10 dark:hover:bg-accentTextDark/10";
    }
    if (variant === "textNegative") {
      return "bg-transparent text-negative border border-accentText/50 dark:border-accentTextDark/50 transition-colors duration-300 hover:bg-accentText/10 dark:hover:bg-accentTextDark/10";
    }
    if (variant === "negative") {
      return "bg-negative text-white transition-colors duration-300 hover:bg-negative/80";
    }
    return "bg-mainBrand text-white transition-colors duration-300 hover:bg-mainBrand/80";
  }

  return (
    <Link
      className={clsx(
        className,
        "block w-full rounded-lg bg-mainBrand py-2 text-center text-xs",
        getVariantBaseClassName(),
      )}
      href={`/${locale}${href}`}
      prefetch
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
