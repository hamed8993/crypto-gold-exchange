import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface TabItemProps {
  href: string;
  title: string;
}

function TabItem({ href, title }: TabItemProps) {
  return (
    <Link
      className={"mx-4 flex w-full items-center justify-between py-2"}
      href={href}
      prefetch
    >
      <div className="border-accentText50 mt-2 flex w-full items-center justify-between border-b pb-5">
        <div className="flex items-center justify-start gap-2">
          <p className={"text-mainText text-sm"}>{title}</p>
        </div>
        <IoIosArrowBack className="text-accentText h-4 w-4 ltr:rotate-180" />
      </div>
    </Link>
  );
}

export default TabItem;
