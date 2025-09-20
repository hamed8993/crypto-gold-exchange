import clsx from "clsx";
import { useTranslations } from "next-intl";
import { BiChevronDown } from "react-icons/bi";

interface NavigationLinksProps {
  containerClassName?: string;
  listItemClassName?: string;
  linkItemClassName?: string;
}

function NavigationLinks({
  containerClassName,
  listItemClassName,
  linkItemClassName,
}: NavigationLinksProps) {
  const t = useTranslations();

  return (
    <ul
      className={clsx(
        "flex h-full gap-10 text-sm font-bold lg:gap-12",
        containerClassName,
      )}
    >
      <li className={clsx("h-full", listItemClassName)}>
        <a
          href="#"
          className={clsx(
            "text-textSecondary flex h-full cursor-pointer items-center justify-center",
            linkItemClassName,
          )}
        >
          {t("trade")}
        </a>
      </li>
      <li className={clsx("h-full", listItemClassName)}>
        <a
          href="#"
          className={clsx(
            "text-textSecondary flex h-full cursor-pointer items-center justify-center",
            linkItemClassName,
          )}
        >
          {t("buy")}
          <BiChevronDown className="ms-1" />
        </a>
      </li>
      <li className={clsx("h-full", listItemClassName)}>
        <a
          href="#"
          className={clsx(
            "text-textSecondary flex h-full cursor-pointer items-center justify-center",
            linkItemClassName,
          )}
        >
          {t("market")}
        </a>
      </li>
      <li className={clsx("h-full", listItemClassName)}>
        <a
          href="#"
          className={clsx(
            "text-textSecondary flex h-full cursor-pointer items-center justify-center",
            linkItemClassName,
          )}
        >
          {t("company")}
        </a>
      </li>
    </ul>
  );
}

export default NavigationLinks;
