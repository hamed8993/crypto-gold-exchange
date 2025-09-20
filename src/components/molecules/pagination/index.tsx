import CustomButton from "@/components/atoms/customButton";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { Dispatch, SetStateAction, useCallback } from "react";
import { BiChevronRight } from "react-icons/bi";
interface PaginationProps {
  setPage: Dispatch<SetStateAction<number>>;
  lastPage?: number;
  page?: number;
}
function Pagination({ page, setPage, lastPage }: PaginationProps) {
  const { locale } = useUrl();

  const getPaginationNumbers = useCallback((): number[] => {
    const initialArray = [];
    const maxNumberToShowOnPaginationSection = 5;
    if (Number(lastPage) <= maxNumberToShowOnPaginationSection) {
      for (let i = 1; i <= Number(lastPage); i++) {
        initialArray.push(i);
      }

      return initialArray;
    } else {
      if (Number(page) === 3) {
        return [1, 2, 3, 4, 0, Number(lastPage)];
      } else if (Number(page) - 0 <= 3) {
        return [1, 2, 3, 0, Number(lastPage)];
      } else if (Number(lastPage) - Number(page) === 2) {
        return [
          1,
          0,
          Number(lastPage) - 3,
          Number(lastPage) - 2,
          Number(lastPage) - 1,
          Number(lastPage),
        ];
      } else if (Number(lastPage) - Number(page) <= 2) {
        return [
          1,
          0,
          Number(lastPage) - 2,
          Number(lastPage) - 1,
          Number(lastPage),
        ];
      } else {
        return [
          1,
          0,
          Number(page) - 1,
          Number(page),
          Number(page) + 1,
          0,
          Number(lastPage),
        ];
      }
    }
  }, [lastPage, page]);

  return (
    <div className="mx-auto flex items-center justify-center py-4 xs:gap-2">
      <CustomButton
        onClick={() => setPage((prev) => prev - 1)}
        isDisabled={Number(page) === 1}
        variant="outline"
        className="group aspect-square h-fit min-h-[unset]! w-fit! rounded-full! p-1! hover:border-mainBrand xs:h-10"
      >
        <BiChevronRight
          className={clsx(
            "mx-auto h-4 w-4 xs:h-[22px] xs:w-[22px]",
            locale === "en" && "rotate-180",
            Number(page) !== 1 && "text-accentText group-hover:text-mainBrand",
          )}
        />
      </CustomButton>

      {getPaginationNumbers().map((item, index) => {
        return item === 0 ? (
          <button
            key={index}
            className="h-6 min-w-6 -translate-y-0.5 border-none text-xs font-semibold text-accentText outline-none xs:h-8 xs:min-w-8 xs:text-sm"
            disabled
          >
            . . .
          </button>
        ) : (
          <button
            key={index}
            className={clsx(
              "h-6 min-w-6 cursor-pointer border-none text-xs text-accentText hover:text-mainBrand xs:h-8 xs:min-w-8 xs:text-sm",
              item === Number(page) && "text-mainBrand",
            )}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        );
      })}
      <CustomButton
        onClick={() => setPage((prev) => prev + 1)}
        isDisabled={Number(page) === Number(lastPage)}
        variant="outline"
        className="group aspect-square h-fit min-h-[unset]! w-fit! rounded-full! p-1! hover:border-mainBrand xs:h-10"
      >
        <BiChevronRight
          className={clsx(
            "mx-auto h-4 w-4 xs:h-[22px] xs:w-[22px]",
            locale === "fa" && "rotate-180",
            Number(page) !== Number(lastPage) &&
              "text-accentText group-hover:text-mainBrand",
          )}
        />
      </CustomButton>
    </div>
  );
}

export default Pagination;
