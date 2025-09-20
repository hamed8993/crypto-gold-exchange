import { localeType } from "@/app/[locale]/layout";
import CustomButton from "@/components/atoms/customButton";
import CustomLineSelect from "@/components/atoms/customLineSelect";
import TypingH2 from "@/components/atoms/typingH2";
import { countries } from "@/core/constants/countries";
import useUrl from "@/core/hooks/useUrl";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FormEventHandler, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useRegisterContext } from "../../provider";

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

interface RegisterStepOneProps {
  next: () => void;
}

function RegisterStepOne({ next }: RegisterStepOneProps) {
  const t = useTranslations();
  const { locale } = useUrl();

  const { setError, setValue, watch } = useRegisterContext();

  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!watch("country")) {
      setError("country", { message: t("pleaseSelectCountry") });
    } else {
      next();
    }
  };

  const getCountryName = (code: string): string => {
    const country = countries.find((country) => country.code === code);
    return country?.[`name_${locale as localeType}`] || "";
  };

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TypingH2
        className="text-mainText mt-10 mb-1 min-h-5 text-start font-semibold"
        text={t("letsGetRegistered")}
      />

      <form
        className="flex h-full w-full flex-col items-center justify-between"
        onSubmit={onSubmit}
      >
        <div className="flex w-full flex-col gap-8">
          <CustomLineSelect
            drawerHeight="100%"
            label={t("countryResidence")}
            setSearch={setSearchTerm}
            placeHolder={t("selectCountry")}
            value={getCountryName(watch("country"))}
            mappedComponent={
              <>
                <div className="bg-mainBackground mt-2 h-screen w-full overflow-y-auto">
                  {Object.keys(grouped)
                    .sort()
                    .map((letter) => (
                      <div key={letter} className="flex">
                        <div className="text-md bg-mainBackground text-mainText sticky start-0 top-0 z-10 flex h-fit w-10 items-center justify-center py-4 text-sm font-semibold">
                          {letter}
                        </div>
                        <div className="w-full text-start">
                          <AnimatePresence mode="sync">
                            {grouped[letter].map((country) => (
                              <motion.div
                                className="text-mainText flex cursor-pointer items-center justify-between px-2 py-4 text-sm"
                                key={country.code}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onClick={() => {
                                  setValue("country", country.code);
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
        </div>
        <div className="flex w-full justify-between gap-2 py-5">
          <CustomButton
            className="h-12 rounded-md"
            isDisabled={!watch("country")}
          >
            {t("continue")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default RegisterStepOne;
