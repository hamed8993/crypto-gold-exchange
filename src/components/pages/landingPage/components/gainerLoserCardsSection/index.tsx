"use client";
import { useGetExchange_dataMarkets_details } from "@/core/services/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";
import GainerLoserCard from "./components/gainerLoserCard";

interface GainerLoserCardsSectionProps {
  className?: string;
  containerClassName?: string;
}

function GainerLoserCardsSection({
  className,
  containerClassName,
}: GainerLoserCardsSectionProps) {
  const { data } = useGetExchange_dataMarkets_details();

  const [maxItems, setMaxItems] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setMaxItems(4);
      else if (width >= 768) setMaxItems(3);
      else setMaxItems(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={clsx(
        "bg-newColor_bgNeutral flex w-full items-center justify-center",
        containerClassName,
      )}
    >
      <span className="bg-newColor_borderNeutral10 inline-block h-px w-full"></span>
      <div
        className={clsx(
          "border-newColor_borderNeutral10 bg-newColor_bgNeutral5 bg-pattern-lines flex w-fit justify-center gap-[10px] rounded-xl border bg-repeat p-[10px]",
          className,
        )}
      >
        {data?.result?.slice(0, maxItems)?.map((item) => (
          <GainerLoserCard key={item?.symbol} item={item} />
        ))}
      </div>
      <span className="bg-newColor_borderNeutral10 inline-block h-px w-full"></span>
    </div>
  );
}

export default GainerLoserCardsSection;
