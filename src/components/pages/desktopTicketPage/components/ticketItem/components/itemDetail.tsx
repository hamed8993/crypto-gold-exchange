import clsx from "clsx";

interface ItemDetailProps {
  className?: string;
  value: string;
  isEnglish?: boolean;
}

const ItemDetail = ({
  value,
  isEnglish = true,
  className,
}: ItemDetailProps) => {
  return (
    <div
      className={clsx(
        "flex h-10 w-full items-center justify-center",
        className,
      )}
    >
      <p
        className={clsx(
          "text-mainText text-xs",
          isEnglish ? "font-english" : "",
        )}
      >
        {value}
      </p>
    </div>
  );
};

export default ItemDetail;
