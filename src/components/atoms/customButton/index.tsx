import clsx from "clsx";
import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode } from "react";

interface CustomButtonProps {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?:
    | "primary"
    | "negative"
    | "textNegative"
    | "textPositive"
    | "outline"
    | "mainBrandOutline"
    | "outlineNegative";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

function CustomButton({
  children,
  className,
  onClick,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  type,
}: CustomButtonProps) {
  const getVariantBaseClassName = () => {
    if (isDisabled) {
      if (variant === "primary") {
        return "bg-mainBrand/60 text-accentText/60";
      } else {
        return "bg-transparent! border !border-accentText cursor-not-allowed";
      }
    } else {
      if (variant === "textPositive") {
        return "bg-transparent text-positive dark:text-positiveDark border border-accentText/50 dark:border-accentTextDark/50";
      }
      if (variant === "textNegative") {
        return "bg-transparent text-negative dark:text-negative border border-accentText/50 dark:border-accentTextDark/50";
      }
      if (variant === "negative") {
        return "bg-negative text-white";
      }
      if (variant === "outline") {
        return "bg-transparent text-mainText dark:text-mainTextDark  border border-accentText/50  dark:border-accentTextDark/50";
      }
      if (variant === "mainBrandOutline") {
        return "bg-transparent  text-negative dark:text-negative  border border-mainBrand";
      }
      if (variant === "outlineNegative") {
        return "bg-transparent  text-negative dark:text-negative  border border-negative";
      }
      return "bg-mainBrand text-white";
    }
  };

  return (
    <button
      className={clsx(
        "min-h-10 w-full rounded-lg bg-mainBrand py-2 text-xs dark:text-mainTextDark",
        getVariantBaseClassName(),
        {
          "flex cursor-not-allowed items-center justify-center opacity-50":
            isLoading,
        },
        isDisabled ? "opacity-70" : "opacity-100",
        className,
      )}
      onClick={!isLoading ? onClick : undefined}
      disabled={isLoading || isDisabled}
      type={type}
    >
      {isLoading ? (
        <motion.div
          className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default CustomButton;
