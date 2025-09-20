import clsx from "clsx";
import { ReactNode } from "react";

interface OrderItemProps {
  title: string | number;
  className?: string;
  isEnglish?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  textClassName?: string;
  extraComponent?: ReactNode;
}

function OrderItem({
  title,
  className,
  isEnglish,
  isButton,
  onClick,
  textClassName,
  extraComponent,
}: OrderItemProps) {
  return (
    <div
      className={clsx(
        "flex min-h-10 w-full items-center justify-center",
        className,
      )}
    >
      {extraComponent}
      {extraComponent && (
        <div className="bg-accentText mx-3 flex min-h-7 w-px" />
      )}
      <p
        dir="ltr"
        onClick={onClick}
        className={clsx(
          "text-mainText text-xs",
          textClassName,
          isEnglish ? "font-english" : "",
          isButton ? "!text-mainBrandAlternative cursor-pointer underline" : "",
        )}
      >
        {title}
      </p>
    </div>
  );
}

export default OrderItem;
