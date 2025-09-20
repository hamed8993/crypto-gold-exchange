import { useTranslations } from "next-intl";
import { IoIosArrowBack } from "react-icons/io";
interface HeaderProps {
  onClick: () => void;
}

function Header({ onClick }: HeaderProps) {
  const t = useTranslations();

  return (
    <div className="bg-mainBackground flex min-h-14 w-full items-center justify-between px-4">
      <IoIosArrowBack
        className="text-mainText h-4 w-4 rotate-180 ltr:rotate-0"
        onClick={onClick}
      />
      <p className="text-mainText text-lg">{t("closedPositionDetail")}</p>
      <div></div>
    </div>
  );
}

export default Header;
