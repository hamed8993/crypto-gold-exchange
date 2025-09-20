import clsx from "clsx";

interface HeaderItemProps {
  title: string;
  className?: string;
  isEnglish?: boolean;
}

function HeaderItem({ title, className, isEnglish }: HeaderItemProps) {
  return (
    <div
      className={clsx(
        "flex min-h-10 w-full items-center justify-center",
        className,
      )}
    >
      <p
        className={clsx(
          "text-accentText text-xs",
          isEnglish ? "font-english" : "",
        )}
      >
        {title}
      </p>
    </div>
  );
}

export default HeaderItem;
