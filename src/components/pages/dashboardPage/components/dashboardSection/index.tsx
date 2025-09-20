import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { IoChevronForward } from "react-icons/io5";

interface DashboardSectionProps {
  title?: string;
  hasAll?: boolean;
  icon?: ReactNode;
  onAllClick?: () => void;
  sectionComponent?: ReactNode;
}

function DashboardSection({
  hasAll,
  icon,
  onAllClick,
  sectionComponent,
  title,
}: DashboardSectionProps) {
  const t = useTranslations();

  return (
    <div>
      <div className="mt-6 flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          {icon}
          <p className="text-sm text-accentText dark:text-accentTextDark">
            {title}
          </p>
        </div>
        {hasAll && (
          <div
            className="flex items-center justify-start gap-1"
            onClick={onAllClick}
          >
            <p className="text-xs text-accentText dark:text-accentTextDark">
              {t("all")}
            </p>
            <IoChevronForward className="h-3 w-3 text-accentText rtl:rotate-180 dark:text-accentTextDark" />
          </div>
        )}
      </div>

      {sectionComponent}
    </div>
  );
}

export default DashboardSection;
