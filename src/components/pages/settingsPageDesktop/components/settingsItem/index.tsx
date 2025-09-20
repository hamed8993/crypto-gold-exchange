import CustomButton from "@/components/atoms/customButton";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactNode } from "react";

interface SettingsItemProps {
  icon: ReactNode;
  title: string;
  href: string;
  description: string;
}

function SettingsItem({ icon, description, title, href }: SettingsItemProps) {
  const t = useTranslations();
  return (
    <div className="border-accentText50 flex min-h-40 w-full items-end justify-between rounded-xl border p-4">
      <div className="flex flex-col items-start justify-center self-start">
        <div className="flex h-fit items-center justify-start gap-4">
          {icon}
          <p className="text-mainText">{title}</p>
        </div>
        <p className="text-accentText mt-2 text-sm">{description}</p>
      </div>
      <Link href={href} prefetch>
        <CustomButton variant="primary" className="h-fit w-28 min-w-28">
          {t("edit")}
        </CustomButton>
      </Link>
    </div>
  );
}

export default SettingsItem;
