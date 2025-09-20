import CardSubtractsLeft from "@/components/atoms/svg/CardSubtractsLeft";
import CardSubtractsRight from "@/components/atoms/svg/CardSubtractsRight";
import clsx from "clsx";
import { useTheme } from "next-themes";

interface DecorativeDividerProps {
  className?: string;
}

function DecorativeDivider({ className }: DecorativeDividerProps) {
  const { theme } = useTheme();

  return (
    <div className={clsx("relative my-[24px] flex items-center", className)}>
      <CardSubtractsLeft
        color={theme === "dark" ? "#010002" : "#f3f3f3"}
        className="absolute -left-[38px]"
      />
      <CardSubtractsRight
        color={theme === "dark" ? "#010002" : "#f3f3f3"}
        className="absolute -right-[38px]"
      />
      <span className="inline-block w-full border-b border-dashed border-accentText50 dark:border-accentTextDark50"></span>
    </div>
  );
}

export default DecorativeDivider;
