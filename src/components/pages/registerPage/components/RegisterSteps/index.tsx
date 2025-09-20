import { useCounter } from "@/core/hooks/useCounter";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostRegisterSend_register_code } from "@/core/services/hooks";
import { CountdownTime } from "@/core/utilities/saveCountdownTime";
import { useMemo, useState } from "react";
import { useRegisterContext } from "../../provider";
import RegisterStepFive from "../registerStepFive";
import RegisterStepFour from "../registerStepFour";
import RegisterStepOne from "../registerStepOne";
import RegisterStepThree from "../registerStepThree";
import RegisterStepTwo from "../registerStepTwo";

interface RegisterStepsProps {
  next: () => void;
  step: number;
}

function RegisterSteps({ next, step }: RegisterStepsProps) {
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { watch } = useRegisterContext();

  const countdown = new CountdownTime("Register");
  const [start, setStart] = useState<boolean>(false);
  const [countStart, setCountStart] = useState(countdown.getRemaining());
  const { count, isCounting, startCounting } = useCounter({
    end: 0,
    start: countStart && countStart !== -1 ? countStart : 60,
    startOnMount: false,
  });

  useMemo(() => {
    if (start) {
      setCountStart(countdown.getRemaining());

      startCounting();

      setStart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const { mutate, isPending: isPendingRegisterCode } =
    usePostRegisterSend_register_code({
      onSuccess: (data) => {
        countdown.save();
        setStart(true);
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const handleNext = () => {
    mutate({
      requestBody: {
        email: watch("email"),
      },
    });
    next();
  };

  return step === 4 ? (
    <RegisterStepFive />
  ) : step === 3 ? (
    <RegisterStepFour next={next} />
  ) : step === 2 ? (
    <RegisterStepThree
      next={next}
      count={count}
      isCounting={isCounting}
      isLoading={isPendingRegisterCode}
      setStart={(state) => setStart(state)}
    />
  ) : step === 1 ? (
    <RegisterStepTwo next={handleNext} />
  ) : (
    <RegisterStepOne next={next} />
  );
}

export default RegisterSteps;
