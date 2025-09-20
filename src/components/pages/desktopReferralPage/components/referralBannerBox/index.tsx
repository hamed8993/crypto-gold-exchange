import AnimationSection from "./components/animation";
import ReferralDetailsRow from "./components/referralDetailsRow";
import TitleButtons from "./components/titleButtons";

function ReferralBannerBox() {
  return (
    <div className="bg-surface flex h-full w-full flex-col items-center justify-around rounded-xl">
      <div className="flex w-full items-center justify-start">
        <AnimationSection />

        <TitleButtons />
      </div>

      <ReferralDetailsRow />
    </div>
  );
}

export default ReferralBannerBox;
