import clsx from "clsx";
import { useTranslations } from "next-intl";
import { BiCheck } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";

interface TitleCheckBoxProps {
  isSlEditable: boolean;
  setIsSlEditable: () => void;
  onHelpClick: () => void;
}

function TitleCheckBox({
  isSlEditable,
  setIsSlEditable,
  onHelpClick,
}: TitleCheckBoxProps) {
  const t = useTranslations();

  return (
    <div className="mx-1 -mb-2 flex min-w-36 items-center justify-start gap-1">
      {isSlEditable ? (
        <div
          onClick={setIsSlEditable}
          className="bg-mainBrandAlternative mx-1 -mb-3 flex min-h-5 min-w-5 items-center justify-center rounded-md"
        >
          <BiCheck className="h-4 w-4 text-white" />
        </div>
      ) : (
        <div
          onClick={setIsSlEditable}
          className="border-accentText50 mx-1 -mb-3 flex min-h-5 min-w-5 items-center justify-center rounded-md border-2 bg-transparent"
        ></div>
      )}
      <p
        className={clsx(
          "self-end text-sm",
          !isSlEditable ? "text-accentText" : "text-mainText",
        )}
      >
        {t("stopLoss")}
      </p>
      <IoHelpCircleOutline
        onClick={onHelpClick}
        className="text-accentText mb-3 h-5 w-5"
      />
    </div>
  );
}

export default TitleCheckBox;
