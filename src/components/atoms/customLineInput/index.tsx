import clsx from "clsx";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface CustomLineInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
  inputClassName?: string;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  isSecured?: boolean;
}

function CustomLineInput({
  error,
  inputClassName,
  label,
  wrapperClassName,
  value,
  type,
  labelClassName,
  isSecured = false,
  ...rest
}: CustomLineInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [isShown, setIsShown] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsShown((prev) => !prev);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={clsx(
        "relative flex w-full flex-col items-start",
        wrapperClassName,
      )}
      ref={inputRef}
    >
      {label && (
        <label
          className={clsx(
            "text pointer-events-none z-10 min-h-5 transition-all duration-200 ease-in-out",
            isFocused || value
              ? "translate-y-1 text-xs text-mainText dark:text-mainTextDark"
              : "translate-y-7 text-sm text-accentText dark:text-accentTextDark",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
        }}
        dir="ltr"
        className={clsx(
          "min-h-9 w-full border-b border-b-accentText/20 bg-transparent text-base font-semibold text-mainText placeholder:text-sm placeholder:text-accentText focus-within:outline-0 rtl:text-end dark:border-b-accentTextDark/20 dark:text-mainTextDark dark:placeholder:text-accentTextDark focus-within:[&>label]:translate-y-3 focus:[&>label]:translate-y-3",
          isFocused
            ? "border-b border-b-positive caret-positive dark:border-b-positiveDark dark:caret-positiveDark"
            : "",
          inputClassName,
        )}
        type={isShown || type !== "password" ? "text" : "password"}
        value={value}
        {...rest}
      />
      {isSecured
        ? null
        : type === "password" && (
            <button
              type="button"
              onClick={toggleVisibility}
              className={"absolute end-3 h-full w-5 cursor-pointer"}
            >
              {isShown ? (
                <BsEye className="translate-y-2 scale-125! text-accentText dark:text-accentTextDark" />
              ) : (
                <BsEyeSlash className="translate-y-2 scale-125! text-accentText dark:text-accentTextDark" />
              )}
            </button>
          )}

      {error && <p className="mx-2 text-[10px] text-negative">{error}</p>}
    </div>
  );
}

export default CustomLineInput;
