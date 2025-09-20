import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface EyesIconButtonProps {
  buttonClassName?: string;
  setInputType: (arg: "password" | "text") => void;
}

function EyesIconButton({
  buttonClassName,
  setInputType,
}: EyesIconButtonProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }, [visible]);

  return (
    <button
      className={clsx("h-full ltr:pl-2 rtl:pr-2", buttonClassName)}
      type="button"
      onClick={() => setVisible(!visible)}
    >
      {visible ? (
        <IoEyeOffOutline className="size-6 text-mainBrand" />
      ) : (
        <IoEyeOutline className="size-6 text-mainBrand" />
      )}
    </button>
  );
}

export default EyesIconButton;
