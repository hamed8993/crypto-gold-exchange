import active from "@/components/atoms/Lottie/active.json";
import Lottie from "lottie-react";

interface AnimationComponentProps {
  marketStatus?: string;
}

const AnimationComponent = ({ marketStatus }: AnimationComponentProps) => {
  return marketStatus === "activeMarket" ? (
    <Lottie animationData={active} autoPlay={true} loop={true} />
  ) : (
    <div className="bg-accentText50 flex h-6 w-6 items-center justify-center rounded-full">
      <div className="bg-accentText flex h-3 w-3 items-center justify-center rounded-full"></div>
    </div>
  );
};

export default AnimationComponent;
