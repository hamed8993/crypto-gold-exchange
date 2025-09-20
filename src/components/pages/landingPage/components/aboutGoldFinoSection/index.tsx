import clsx from "clsx";
import HighlightSectionAboutGoldfino from "./components/highlightSectionAboutGoldfino";
import InfoSlider from "./components/infoSlider";

interface AboutGoldFinoSectionProps {
  containerClassName?: string;
}

function AboutGoldFinoSection({
  containerClassName,
}: AboutGoldFinoSectionProps) {
  return (
    <div
      className={clsx(
        "bg-newColor_bgNeutral flex w-full flex-col gap-16",
        containerClassName,
      )}
    >
      <HighlightSectionAboutGoldfino className="bg-transparent" />
      <InfoSlider />
    </div>
  );
}

export default AboutGoldFinoSection;
