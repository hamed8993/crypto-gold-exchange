import { useEffect, useState } from "react";

interface usePasswordValidateProps {
  password: string;
}

function usePasswordValidate({ password = "" }: usePasswordValidateProps) {
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const checkCharacterLength = () => {
    return password.length >= 8;
  };

  const checkHasNumber = () => {
    return /\d/.test(password);
  };

  const checkHasLowercase = () => {
    return /[a-z]/.test(password);
  };

  const checkHasUppercase = () => {
    return /[A-Z]/.test(password);
  };

  useEffect(() => {
    if (
      checkCharacterLength() &&
      checkHasNumber() &&
      checkHasLowercase() &&
      checkHasUppercase()
    ) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);

  return {
    isPasswordValid,
    checkCharacterLength,
    checkHasNumber,
    checkHasLowercase,
    checkHasUppercase,
  };
}

export default usePasswordValidate;
