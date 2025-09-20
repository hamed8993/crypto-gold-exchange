import blink from "@/components/atoms/Lottie/blink.json";
import Lottie from "lottie-react";

const AnimationComponent = () => {
  return (
    <Lottie
      height={15}
      animationData={blink}
      loop={true}
      width={15}
      autoPlay={true}
    />
  );
};

export default AnimationComponent;
