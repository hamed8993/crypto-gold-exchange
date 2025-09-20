"use client";
import UniverseLeftIcon from "@/components/atoms/svg/universeLeft";
import UniverseRightIcon from "@/components/atoms/svg/universeRight";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Content from "./components/content";

interface RegisterNavigationSectionProps {
  containerClassName?: string;
}

function RegisterNavigationSection({
  containerClassName,
}: RegisterNavigationSectionProps) {
  const { theme } = useTheme();

  return (
    <div className={clsx("flex w-full items-center", containerClassName)}>
      <span className="bg-newColor_borderNeutral10 inline h-px w-full lg:flex-1" />
      <div className="border-newColor_borderNeutral10 bg-newColor_bgNeutral5 w-[738px] min-w-[738px] rounded-xl border p-[10px] lg:w-[983px] 2xl:w-[1156px]">
        <div className="bg-newColor_bgNeutral relative w-full overflow-hidden rounded-lg">
          <Content />
          <UniverseLeftIcon
            className="absolute bottom-0 left-[-155px] lg:left-0"
            dotColor={theme === "dark" ? "#F4F5F6" : "#1E2025"}
          />
          <UniverseRightIcon
            className="absolute top-0 right-[-175px] lg:right-0"
            dotColor={theme === "dark" ? "#F4F5F6" : "#1E2025"}
          />
        </div>
      </div>
      <span className="bg-newColor_borderNeutral10 inline h-px w-full lg:flex-1" />
    </div>
  );
}

export default RegisterNavigationSection;
