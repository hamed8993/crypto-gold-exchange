import clsx from "clsx";

interface BadgeProps {
  type: "long" | "short";
}

function Badge({ type }: BadgeProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-md px-[6px] py-[6px]",
        type === "long"
          ? "bg-positive/40 dark:bg-positiveDark/40"
          : "bg-negative/40",
      )}
    >
      <p
        className={clsx(
          "text-[10px] leading-none",
          type === "long"
            ? "text-positive dark:text-positiveDark"
            : "text-negative",
        )}
      >
        {type === "long" ? "long".toUpperCase() : "short".toUpperCase()}
      </p>
    </div>
  );
}

export default Badge;
