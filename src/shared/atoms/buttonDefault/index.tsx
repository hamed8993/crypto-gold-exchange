"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { MouseEventHandler, ReactNode, useCallback } from "react";

interface ButtonDefaultProps {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "primary" | "outline";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonType?: "button" | "submit" | "reset";
  href?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  size?: "sm" | "lg";
}

function ButtonDefault({
  children,
  className,
  onClick,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  buttonType,
  href,
  icon,
  size = "sm",
  iconPosition = "end",
}: ButtonDefaultProps) {
  const getVariantBaseClassName = useCallback(() => {
    if (isDisabled) {
      if (variant === "primary") {
        return "bg-bgHover  text-textSolidWhite";
      } else {
        return "bg-transparent! border !border-borderDefault";
      }
    } else {
      switch (variant) {
        case "outline":
          return "bg-transparent text-textPrimary hover:bg-bgMuted hover:border-bgMuted text-SolidWhite border-2 border-borderDefault";
        default:
          return "bg-bgAccent  text-textSolidWhite  text-sm hover:bg-bgHover";
      }
    }
  }, [isDisabled, variant]);

  const commonClassName = clsx(
    "min-h-10 h-fit w-fit rounded-xl flex items-center text-sm  justify-center gap-3",
    size === "sm" ? "py-3 px-4" : "py-4  px-6 leading-4",
    iconPosition === "end" ? "flex-row-reverse" : "flex-row",
    getVariantBaseClassName(),
    {
      "flex cursor-default items-center justify-center opacity-50": isLoading,
    },
    isDisabled ? "opacity-50 cursor-default" : "opacity-100",
    className,
  );

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return href && !isDisabled && !isLoading ? (
      <Link href={href} className={commonClassName}>
        {children}
      </Link>
    ) : (
      <button
        className={commonClassName}
        onClick={onClick}
        disabled={isLoading || isDisabled}
        type={buttonType}
      >
        {children}
      </button>
    );
  };

  return (
    <Wrapper>
      {isLoading ? (
        <motion.div
          className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Wrapper>
  );
}
export default ButtonDefault;
