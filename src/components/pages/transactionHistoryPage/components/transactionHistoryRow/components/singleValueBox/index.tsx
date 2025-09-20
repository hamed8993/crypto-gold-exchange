import { ReactNode } from "react";

interface SingleValueBoxProps {
  title?: string;
  value?: string;
  extraComponent?: ReactNode;
}

function SingleValueBox({ title, value, extraComponent }: SingleValueBoxProps) {
  return (
    <div className="flex min-h-[40px] flex-col">
      <p className="text-accentText text-sm">{title}:</p>
      {extraComponent ? (
        extraComponent
      ) : (
        <p className="font-english text-mainText w-fit text-sm" dir="ltr">
          {value || "--"}
        </p>
      )}
    </div>
  );
}

export default SingleValueBox;
