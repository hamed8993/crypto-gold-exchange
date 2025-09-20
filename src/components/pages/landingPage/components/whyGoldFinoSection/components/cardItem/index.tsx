import { ReactNode } from "react";

interface CardItemProps {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  text?: string | ReactNode;
  imageSection?: ReactNode;
}

function CardItem({ title, subTitle, text, imageSection }: CardItemProps) {
  return (
    <div className="border-newColor_borderSolid bg-newColor_bgPrimary50 relative flex h-[430px] w-[460px] flex-col gap-[10px] rounded-xl border p-4 lg:h-[350px] lg:w-[275px] 2xl:h-[350px] 2xl:w-[335px]">
      <h2 className="text-textWarning text-xs leading-[150%] font-semibold">
        {title}
      </h2>
      <div className="flex flex-col gap-[10px]">
        <p className="text-constantLight text-2xl font-semibold text-nowrap">
          {subTitle}
        </p>
        <p className="text-newColor_textNeutral40 mt-1 max-w-[70%] text-xs font-semibold text-nowrap">
          {text}
        </p>
      </div>
      {imageSection}
    </div>
  );
}

export default CardItem;
