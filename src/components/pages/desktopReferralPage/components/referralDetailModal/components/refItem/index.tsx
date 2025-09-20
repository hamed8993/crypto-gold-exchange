import { IconType } from "react-icons/lib";

interface RefItemProps {
  Icon: IconType;
  title: string;
  value?: string;
}

function RefItem({ Icon, title, value }: RefItemProps) {
  return (
    <div className="flex w-full items-center justify-between px-3 py-4">
      <div className="flex items-center justify-start gap-1">
        <Icon className="text-mainBrand text-2xl" />
        <p className="text-mainText text-sm">{title}</p>
      </div>
      <p className="font-english text-mainText text-sm">{value}</p>
    </div>
  );
}

export default RefItem;
