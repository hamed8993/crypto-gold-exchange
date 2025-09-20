import referral from "@/components/atoms/Lottie/referral.json";
import Lottie from "lottie-react";

const Animation = () => {
  return (
    <Lottie
      animationData={referral}
      autoPlay={true}
      height={100}
      loop={true}
      width={100}
    />
  );
};

export default Animation;
