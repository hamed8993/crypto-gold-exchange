import clsx from "clsx";

interface ListHeaderItemProps {
  title: string;
  className?: string;
}

const ListHeaderItem = ({ title, className }: ListHeaderItemProps) => {
  return (
    <div
      className={clsx(
        "flex h-10 w-full items-center justify-center",
        className,
      )}
    >
      <p className="text-mainText text-xs">{title}</p>
    </div>
  );
};

export default ListHeaderItem;
