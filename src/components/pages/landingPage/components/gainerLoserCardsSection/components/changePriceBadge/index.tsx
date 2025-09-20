import clsx from "clsx";

interface ChangePriceBadgeProps {
  changePrice: string;
}

function ChangePriceBadge({ changePrice }: ChangePriceBadgeProps) {
  const isAscending = (changePrice: string) => {
    return parseFloat(changePrice) > 0;
  };

  const addPlusIfIsAscending = (changePrice: string) => {
    return parseFloat(changePrice) > 0 ? `+${changePrice}` : changePrice;
  };

  return (
    <span
      className={clsx(
        "flex items-center justify-center text-nowrap rounded-3xl px-2 py-[2px] font-english text-[12px] font-normal [direction:ltr]",
        isAscending(changePrice)
          ? "bg-bgSuccess text-textSuccess"
          : "bg-bgError text-newColor_textError50",
      )}
    >
      {addPlusIfIsAscending(changePrice)} %
    </span>
  );
}

export default ChangePriceBadge;
