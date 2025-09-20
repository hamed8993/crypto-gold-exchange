import SearchIcon from "@/components/atoms/svg/searchIcon";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface SearchInputProps {
  searchTypeHandler: (arg: string) => void;
}

function SearchInput({ searchTypeHandler }: SearchInputProps) {
  const t = useTranslations();
  const [searchValue, setSearchValue] = useState<string>("");
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);

  const isTypingInput = () => {
    return searchValue && searchValue?.length > 0;
  };

  const isSearchIconActive = () => {
    return inputIsFocused || isTypingInput();
  };

  const onchangeHandler = (value: string) => {
    if (value == " " && !searchValue) return;
    setSearchValue(value);
  };

  useEffect(() => {
    searchTypeHandler(searchValue);
  }, [searchValue]);

  return (
    <div className="group border-newColor_borderNeutral10 text-iconDisabled focus-within:border-borderFocus hover:border-borderFocus flex !h-10 items-center justify-between gap-2 rounded-lg border p-3">
      <button type="button" onClick={() => searchTypeHandler(searchValue)}>
        <SearchIcon
          className="size-5 flex-shrink-0 text-red-600"
          color={isSearchIconActive() ? "#1B264F" : "#A3A9B6"}
        />
      </button>
      <input
        className={`w-full border-none text-sm font-normal focus:border-none focus:outline-none ${isTypingInput() ? "text-textPrimary dark:text-constantLight" : "text-textPlaceholder"}`}
        onChange={(e) => onchangeHandler(e.target.value)}
        value={searchValue}
        placeholder={t("search")}
        onFocus={() => setInputIsFocused(true)}
        onBlur={() => setInputIsFocused(false)}
      />
      {isTypingInput() && (
        <button type="button" onClick={() => setSearchValue("")}>
          <RxCross2 color="#1B264F" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
