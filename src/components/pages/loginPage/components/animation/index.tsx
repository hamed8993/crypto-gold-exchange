"use client";
import Lottie from "lottie-react";
import goldBarsAnimation from "@/components/atoms/animations/goldBars.json";

function Animation() {
  return (
    <div className="h-56 w-56">
      <Lottie animationData={goldBarsAnimation} />
    </div>
  );
}

export default Animation;
