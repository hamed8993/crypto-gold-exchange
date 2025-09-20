import clsx from "clsx";
import Image from "next/image";

interface IFrameMobileSectionProps {
  containerClassName?: string;
}

function IFrameMobileSection({ containerClassName }: IFrameMobileSectionProps) {
  return (
    <div
      className={clsx(
        "relative flex h-[292px] w-full justify-center overflow-hidden",
        containerClassName,
      )}
    >
      <Image
        alt="iframe mobile"
        src="/assets/images/landing/landing-mobile-section-image.png"
        width={904}
        height={477}
        className="absolute top-0 h-[477px] w-[636px] lg:w-[904px]"
      />
      <div className="from-newColor_bgNeutral absolute right-0 bottom-0 left-0 h-[20%] bg-linear-to-t to-transparent"></div>
    </div>
  );
}
export default IFrameMobileSection;
