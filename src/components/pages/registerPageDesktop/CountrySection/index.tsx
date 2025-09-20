import { localeType } from "@/app/[locale]/layout";
import SelectDesktop from "@/components/molecules/SelectDesktop";
import { countries } from "@/core/constants/countries";
import useUrl from "@/core/hooks/useUrl";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useRegisterContext } from "../provider";

type Country = {
  name_en: string;
  name_fa: string;
  name_ru: string;
  name_ar: string;
  name_tr: string;
  code: string;
};

type GroupedCountries = {
  [letter: string]: Country[];
};

const CountrySection = () => {
  const { locale } = useUrl();
  const t = useTranslations();
  const { setValue, watch } = useRegisterContext();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const groupedCountries = (countries: Country[]): GroupedCountries => {
    const searchTermReady = searchTerm.trim().toLowerCase();
    const filteredData = countries
      .filter((country) =>
        country[`name_${locale as localeType}`]
          .toLowerCase()
          .includes(searchTermReady),
      )
      .sort((a, b) =>
        b[`name_${locale as localeType}`].localeCompare(
          a[`name_${locale as localeType}`],
        ),
      );
    return filteredData.reduce((acc: GroupedCountries, country: Country) => {
      const letter = country[`name_${locale as localeType}`][0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(country);
      return acc;
    }, {});
  };

  const grouped = useMemo(
    () => groupedCountries(countries),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countries, searchTerm],
  );

  const getCountryName = (code: string): string => {
    const country = countries.find((country) => country.code === code);
    return country?.[`name_${locale as localeType}`] || "";
  };

  return (
    <SelectDesktop
      isOpen={isSelectOpen}
      setIsOpen={setIsSelectOpen}
      hasSearch
      searchOnChange={setSearchTerm}
      searchValue={searchTerm}
      label={t("countryResidence")}
      labelContainerClassName="bg-surface "
      wrapperClassName="mb-auto"
      valueComponent={
        <p className="text-mainText w-full text-sm">
          {watch("country") ? getCountryName(watch("country")) : t("choose")}
        </p>
      }
      optionsComponent={
        <>
          <div className="h-[200px] w-full overflow-y-auto">
            {Object.keys(grouped)
              .sort()
              .map((letter) => (
                <div key={letter} className="flex">
                  <div className="text-md text-mainText sticky start-0 top-0 z-10 flex h-fit w-10 items-center justify-center py-4 text-sm font-semibold">
                    {letter}
                  </div>
                  <div className="w-full text-start">
                    <AnimatePresence mode="sync">
                      {grouped[letter].map((country) => (
                        <motion.div
                          className="border-b-border/50 text-mainText flex w-[90%] cursor-pointer items-center justify-between border-b px-2 py-4 text-sm"
                          key={country.code}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          onClick={() => {
                            setValue("country", country.code);
                            setIsSelectOpen(false);
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {country[`name_${locale as localeType}`]}
                          {watch("country") ===
                            country[`name_${locale as localeType}`] && (
                            <FaCheck className="text-positive scale-125" />
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
          </div>
        </>
      }
    />
  );
};

export default CountrySection;
