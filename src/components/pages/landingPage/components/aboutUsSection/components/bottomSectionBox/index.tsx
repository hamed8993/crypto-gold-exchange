import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

interface BottomSectionBoxProps {
  title: string | ReactNode;
  text?: string | ReactNode;
  imageName?: string;
  imageClassName?: string;
}

function BottomSectionBox({
  title,
  text,
  imageName,
  imageClassName,
}: BottomSectionBoxProps) {
  return (
    <div className="border-newColor_borderNeutral10 bg-constantLight relative h-[267px] w-[226px] overflow-hidden rounded-xl border p-4 lg:h-[267px] lg:w-[314px] 2xl:w-[372px]">
      <h2 className="text-newColor_bgPrimary50 text-[20px] leading-[150%] font-semibold lg:text-2xl">
        {title}
      </h2>
      <p className="text-newColor_textNeutral40 mt-1 max-w-full text-xs font-semibold lg:max-w-[70%]">
        {text}
      </p>
      <Image
        alt={`${imageName}`}
        width={247}
        height={146}
        src={`/assets/images/landing/${imageName}`}
        className={clsx(
          "absolute bottom-0 h-[128px] w-[216px] lg:h-[146px] lg:w-[247px] ltr:right-0 ltr:scale-x-[-1] ltr:transform rtl:left-0",
          imageClassName,
        )}
      />
    </div>
  );
}

export default BottomSectionBox;
