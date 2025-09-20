import CustomInput from "@/components/atoms/customInput";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

interface SearchBoxProps {
  className?: string;
  clearInput: () => void;
  onChange: (value: string) => void;
  searchText: string;
}

function SearchBox({
  className,
  clearInput,
  onChange,
  searchText,
}: SearchBoxProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "bg-surface mx-2 mt-4 flex h-12 w-full items-center justify-start rounded-lg",
        className,
      )}
    >
      <FiSearch className="text-accentText mx-3 h-6 w-6" />
      <CustomInput
        inputClassName="w-full border-none text-center px-0"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={t("search")}
        value={searchText}
      />
      {searchText && (
        <div
          className="flex h-12 w-12 items-center justify-center"
          onClick={clearInput}
        >
          <RxCross1 className="text-accentText mx-3 h-4 w-4" />
        </div>
      )}
    </div>
  );
}

export default SearchBox;
