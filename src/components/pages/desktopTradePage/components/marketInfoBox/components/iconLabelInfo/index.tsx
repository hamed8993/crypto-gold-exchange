import { ReactNode } from "react";

interface IconLabelInfoProps {
  icon: ReactNode;
  label: string;
  value: string;
  quote?: string;
}

function IconLabelInfo({ icon, label, value, quote }: IconLabelInfoProps) {
  return (
    <div className="bg-secondBackground flex h-full w-full flex-col items-start justify-between rounded-lg p-2">
      <div className="flex items-center justify-start gap-1.5">
        {icon}
        <p className="text-accentText w-20 text-sm">{label}</p>
      </div>

      <div className="mt-3 flex items-center justify-start gap-1.5 self-end">
        <p className="font-english text-mainText text-sm">{value || "0"}</p>
        <p className="text-accentText text-xs">{quote || ""}</p>
      </div>
    </div>
  );
}

export default IconLabelInfo;
