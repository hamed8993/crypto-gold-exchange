import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface PortfolioButtonsProps {
  className?: string;
  href: string;
  icon: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  title: string;
}

function PortfolioButtons({
  className,
  href,
  icon,
  onClick,
  title,
}: PortfolioButtonsProps) {
  return (
    <Link
      className="flex w-[33%] min-w-[33%] max-w-[33%] flex-col items-center justify-center gap-2"
      href={href}
      onClick={onClick}
    >
      <div
        className={clsx(
          "flex h-10 w-full items-center justify-between rounded-md",
          className,
        )}
      >
        <div className="flex w-full items-center justify-center gap-2">
          {icon}
          <p className="text-[11px] text-white">{title}</p>
        </div>

        <div className="flex h-[80%] w-px bg-white/30 dark:bg-white/30" />

        <div className="flex h-10 w-12 items-center justify-center">
          <IoIosArrowBack className="h-4 w-4 text-white/30 ltr:rotate-180 dark:text-white/30" />
        </div>
      </div>
    </Link>
  );
}

export default PortfolioButtons;
