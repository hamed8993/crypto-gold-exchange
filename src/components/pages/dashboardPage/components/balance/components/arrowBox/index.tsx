import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";

interface ArrowBoxProps {
  onClick: () => void;
  isDrawerOpen: boolean;
}

function ArrowBox({ isDrawerOpen, onClick }: ArrowBoxProps) {
  return (
    <div
      onClick={onClick}
      className="flex h-[22px] w-[97%] items-center justify-center self-center rounded-b-lg bg-surface dark:bg-surfaceDark"
    >
      <IoIosArrowDown
        className={clsx(
          "h-[16px] w-[16px] text-mainText dark:text-mainTextDark",
          isDrawerOpen ? "rotate-180" : "",
        )}
      />
    </div>
  );
}

export default ArrowBox;
