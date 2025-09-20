import ForgetPasswordStepOne from "../forgetPasswordStepOne";
import ForgetPasswordStepThree from "../forgetPasswordStepThree";
import ForgetPasswordStepTwo from "../forgetPasswordStepTwo";

interface ForgetPasswordStepsProps {
  step: number;
  next: () => void;
}

function ForgetPasswordSteps({ next, step }: ForgetPasswordStepsProps) {
  return step === 2 ? (
    <ForgetPasswordStepThree />
  ) : step === 1 ? (
    <ForgetPasswordStepTwo next={next} />
  ) : (
    <ForgetPasswordStepOne next={next} />
  );
}

export default ForgetPasswordSteps;
