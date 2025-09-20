import { BsArrowBarRight } from "react-icons/bs";

interface SpreadComponentProps {
  spread: number;
}

function SpreadComponent({ spread }: SpreadComponentProps) {
  return (
    <div className="bg-surface absolute right-[calc(50%-30px)] mt-1 flex h-6! w-16 items-center justify-between self-start rounded-[4px] px-1">
      <BsArrowBarRight className="text-accentText text-sm" />
      <p className="font-english text-mainText text-xs">{spread}</p>
      <BsArrowBarRight className="text-accentText rotate-180 text-sm" />
    </div>
  );
}

export default SpreadComponent;
