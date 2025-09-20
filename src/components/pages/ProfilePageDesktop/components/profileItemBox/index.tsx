import { ReactNode } from "react";

interface ProfileItemBoxProps {
  title?: string;
  value?: string;
  hasComponent?: boolean;
  extraTitle?: string;
  extraValue?: string;
  extraComponent?: ReactNode;
}

function ProfileItemBox({
  title,
  value,
  extraTitle,
  extraValue,
  hasComponent = false,
  extraComponent,
}: ProfileItemBoxProps) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <p className="text-accentText text-xs text-nowrap">{title}</p>
      {hasComponent ? (
        extraComponent ? (
          extraComponent
        ) : (
          <div className="flex items-end justify-start gap-1">
            <p className="font-english text-mainText">{extraTitle}</p>

            <p className="text-accentText text-xs">{extraValue}</p>
          </div>
        )
      ) : (
        <p className="text-mainText text-sm">{value}</p>
      )}
    </div>
  );
}

export default ProfileItemBox;
