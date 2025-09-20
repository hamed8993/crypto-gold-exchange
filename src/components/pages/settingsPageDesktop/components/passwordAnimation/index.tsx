import Lottie from "lottie-react";

import passwordAnimation from "@/components/atoms/animations/password.json";

function PasswordAnimation() {
  return (
    <div className="mx-auto h-56 w-56">
      <Lottie animationData={passwordAnimation} />
    </div>
  );
}

export default PasswordAnimation;
