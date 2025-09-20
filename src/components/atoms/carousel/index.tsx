import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
  duration?: number;
  length: number;
  type?: "horizontal" | "vertical";
  className?: string;
}

function Carousel({
  children,
  duration = 10,
  length,
  className,
  type = "horizontal",
}: CarouselProps) {
  const { locale } = useUrl();
  const animation = Array(length + 1)
    .fill(1)
    .reduce((acc, _, index) => {
      if (type === "vertical") {
        for (let i = 0; i < 2; i++) {
          acc += `${index * -100}${index === length && i === 1 ? "%" : "%,"}`;
        }
      } else {
        for (let i = 0; i < 2; i++) {
          acc += `${rtlLanguages.includes(locale as localeType) ? index * 100 : index * -100}${index === length && i === 1 ? "%" : "%,"}`;
        }
      }
      return acc.split(",");
    }, "");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={
          type === "vertical"
            ? {
                y: animation,
              }
            : {
                x: animation,
              }
        }
        className={clsx(
          "flex w-full flex-nowrap gap-1 p-1",
          type === "vertical" && "h-full min-h-full gap-0 p-0",
          className,
        )}
        style={{
          flexDirection: type === "horizontal" ? "row" : "column",
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.5, 0.5, 0.5, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default Carousel;
