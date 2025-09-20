import clsx from "clsx";
import { MouseEventHandler } from "react";
import { FaCheck } from "react-icons/fa6";

interface CustomCheckboxProps {
  label?: string;
  labelClassName?: string;
  className?: string;
  onChange: MouseEventHandler<HTMLDivElement>;
  value: boolean;
}

function CustomCheckbox({
  className,
  label,
  labelClassName,
  onChange,
  value,
}: CustomCheckboxProps) {
  return (
    <div
      className="flex h-fit w-fit cursor-pointer items-center gap-2"
      onClick={onChange}
    >
      <div className="relative h-6 w-6 rounded-md">
        <input
          className={clsx(
            "h-full w-full cursor-pointer appearance-none rounded-md border-2 border-borderDefault checked:border-mainBrand checked:bg-mainBrand",
            className,
          )}
          checked={value}
          type="checkbox"
        />
        {value && (
          <FaCheck className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-textSolidWhite" />
        )}
      </div>
      {label && (
        <label className={clsx("text-sm text-textPrimary", labelClassName)}>
          {label}
        </label>
      )}
    </div>
  );
}

export default CustomCheckbox;
