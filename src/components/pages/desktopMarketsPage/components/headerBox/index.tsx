import clsx from "clsx";

interface HeaderBoxProps {
  title: string;
  wrapperClassName?: string;
}

function HeaderBox({ title, wrapperClassName }: HeaderBoxProps) {
  return (
    <div
      className={clsx(
        "flex w-full items-center justify-center",
        wrapperClassName,
      )}
    >
      <p className="text-sm text-accentText dark:text-accentTextDark">
        {title}
      </p>
    </div>
  );
}

export default HeaderBox;
