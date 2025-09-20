"use client";
import LandingGoldfinoLeftIconDark from "@/components/atoms/svg/landingGoldfinoLeftIconDark";
import LandingGoldfinoLeftIconLight from "@/components/atoms/svg/landingGoldfinoLeftIconLight";
import LandingGoldfinoRightIconDark from "@/components/atoms/svg/landingGoldfinoRightIconDark";
import LandingGoldfinoRightIconLight from "@/components/atoms/svg/landingGoldfinoRightIconLight";
import SignUpInput from "@/components/molecules/signUpInput";
import clsx from "clsx";
import { useTheme } from "next-themes";
import HighlightSectionGoldFino from "./components/highlightSectionGoldFino";

interface GoldfinoSectionProps {
  containerClassName?: string;
}

function GoldfinoSection({ containerClassName }: GoldfinoSectionProps) {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        "bg-newColor_bgNeutral relative w-full overflow-hidden",
        containerClassName,
      )}
    >
      <div className="flex flex-col gap-[42px]">
        <HighlightSectionGoldFino className="bg-transparent" />
        <SignUpInput />
      </div>
      <>
        <LandingGoldfinoLeftIconLight
          className={clsx(
            "absolute top-auto bottom-[-25px] left-[-25px] h-[172px] w-[120px] transform lg:top-1/2 lg:bottom-auto lg:left-0 lg:h-[184px] lg:w-[208px] lg:-translate-y-1/2 2xl:w-[264px]",
            theme === "dark" ? "hidden" : "block",
          )}
        />
        <LandingGoldfinoRightIconLight
          className={clsx(
            "absolute right-[-35px] bottom-0 h-[170px] w-[155px] lg:h-[286px] lg:w-[245px] 2xl:w-[272px]",
            theme === "dark" ? "hidden" : "block",
          )}
        />
        <LandingGoldfinoLeftIconDark
          className={clsx(
            "absolute top-auto bottom-[-25px] left-[-25px] h-[172px] w-[120px] transform lg:top-1/2 lg:bottom-auto lg:left-0 lg:h-[184px] lg:w-[208px] lg:-translate-y-1/2 2xl:w-[264px]",
            theme === "dark" ? "block" : "hidden",
          )}
        />
        <LandingGoldfinoRightIconDark
          className={clsx(
            "absolute right-[-35px] bottom-0 h-[170px] w-[155px] lg:h-[286px] lg:w-[245px] 2xl:w-[272px]",
            theme === "dark" ? "block" : "hidden",
          )}
        />
      </>
    </div>
  );
}

export default GoldfinoSection;
