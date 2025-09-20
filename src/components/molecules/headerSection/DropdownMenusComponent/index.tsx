import { localeType } from "@/app/[locale]/layout";
import CustomDropdown from "@/components/atoms/customDropdown";
import { rtlLanguages } from "@/core/constants/constants";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";

interface DropdownMenusComponentProps {
  dropdown: "" | "discover" | "company" | "trading";
  hasHeaderBg?: boolean;
  hasScrolled: boolean;
  setDropdown: Dispatch<
    SetStateAction<"" | "discover" | "company" | "trading">
  >;
}

const DropdownMenusComponent = ({
  dropdown,
  hasScrolled,
  hasHeaderBg,
  setDropdown,
}: DropdownMenusComponentProps) => {
  const t = useTranslations();
  const { locale } = useUrl();

  const { isLoggedIn } = useAuth();

  return (
    <ul className="hidden h-full w-full items-center gap-8 md:flex">
      <li
        className={clsx(
          "flex h-full items-center gap-3",
          dropdown === "trading" && "border-b-4 border-blue-500",
        )}
      >
        <CustomDropdown
          className="-bottom-8!"
          setIsSelectOpen={(isVisible) =>
            isVisible ? setDropdown("trading") : setDropdown("")
          }
          toggler={
            <>
              <p
                className={clsx(
                  hasHeaderBg && !hasScrolled
                    ? "text-mainTextDark dark:text-mainTextDark"
                    : "text-mainText dark:text-mainTextDark",
                  dropdown === "trading" && "text-blue-500!",
                )}
              >
                {t("trading")}
              </p>
              <BiChevronDown
                className={clsx(
                  "min-h-6",
                  hasHeaderBg && !hasScrolled
                    ? "text-mainTextDark dark:text-mainTextDark"
                    : "text-mainText dark:text-mainTextDark",

                  dropdown === "trading" && "text-blue-500!",
                )}
                size={24}
              />
            </>
          }
          togglerClassName="h-full"
        >
          <div
            className={clsx(
              "overflow-hidden rounded-xl bg-mainBackground p-6 dark:bg-mainBackgroundDark",
              isLoggedIn ? "w-[640px]" : "w-52",
            )}
          >
            <div className="mx-auto grid grid-cols-3 gap-4 divide-x divide-accentText/50 text-sm rtl:divide-x-reverse">
              <div>
                <h3 className="mb-4 font-semibold uppercase text-accentText">
                  {t("trade")}
                </h3>
                <ul className="space-y-2 text-mainText dark:text-mainTextDark">
                  <Link
                    href={`/${locale}/${RoutesName.trade}/xaggr-irt`}
                    prefetch
                  >
                    <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                      <p>{t("trade")}</p>
                      <BiChevronRight
                        className={clsx(
                          "hidden group-hover:block",
                          rtlLanguages.includes(locale as localeType) &&
                            "rotate-180",
                        )}
                        size={16}
                      />
                    </li>
                  </Link>
                  <Link href={`/${locale}/${RoutesName.markets}`} prefetch>
                    <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                      <p> {t("markets")}</p>
                      <BiChevronRight
                        className={clsx(
                          "hidden group-hover:block",
                          rtlLanguages.includes(locale as localeType) &&
                            "rotate-180",
                        )}
                        size={16}
                      />
                    </li>
                  </Link>
                </ul>
              </div>

              {isLoggedIn && (
                <div className="ps-2">
                  <h3 className="mb-4 font-semibold uppercase text-accentText">
                    {t("account")}
                  </h3>
                  <ul className="space-y-2 text-mainText dark:text-mainTextDark">
                    {isLoggedIn && (
                      <Link
                        href={`/${locale}/${RoutesName.portfolio}`}
                        prefetch
                      >
                        <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                          <p> {t("portfolio")}</p>
                          <BiChevronRight
                            className={clsx(
                              "hidden group-hover:block",
                              rtlLanguages.includes(locale as localeType) &&
                                "rotate-180",
                            )}
                            size={16}
                          />
                        </li>
                      </Link>
                    )}

                    {isLoggedIn && (
                      <Link href={`/${locale}/${RoutesName.deposit}`} prefetch>
                        <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                          <p> {t("deposit")}</p>
                          <BiChevronRight
                            className={clsx(
                              "hidden group-hover:block",
                              rtlLanguages.includes(locale as localeType) &&
                                "rotate-180",
                            )}
                            size={16}
                          />
                        </li>
                      </Link>
                    )}

                    {isLoggedIn && (
                      <Link href={`/${locale}/${RoutesName.withdraw}`} prefetch>
                        <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                          <p> {t("withdraw")}</p>
                          <BiChevronRight
                            className={clsx(
                              "hidden group-hover:block",
                              rtlLanguages.includes(locale as localeType) &&
                                "rotate-180",
                            )}
                            size={16}
                          />
                        </li>
                      </Link>
                    )}

                    <Link href={`/${locale}/${RoutesName.settings}`} prefetch>
                      <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                        <p> {t("settings")}</p>
                        <BiChevronRight
                          className={clsx(
                            "hidden group-hover:block",
                            rtlLanguages.includes(locale as localeType) &&
                              "rotate-180",
                          )}
                          size={16}
                        />
                      </li>
                    </Link>
                  </ul>
                </div>
              )}

              {isLoggedIn && (
                <div className="ps-2">
                  <h3 className="mb-4 font-semibold uppercase text-accentText">
                    {t("historyTitle")}
                  </h3>
                  <ul className="space-y-2 text-mainText dark:text-mainTextDark">
                    <Link href={`/${locale}/${RoutesName.openOrders}`} prefetch>
                      <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                        <p> {t("openOrders")}</p>
                        <BiChevronRight
                          className={clsx(
                            "hidden group-hover:block",
                            rtlLanguages.includes(locale as localeType) &&
                              "rotate-180",
                          )}
                          size={16}
                        />
                      </li>
                    </Link>
                    <Link
                      href={`/${locale}/${RoutesName.openPositions}`}
                      prefetch
                    >
                      <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                        <p> {t("openPositions")}</p>
                        <BiChevronRight
                          className={clsx(
                            "hidden group-hover:block",
                            rtlLanguages.includes(locale as localeType) &&
                              "rotate-180",
                          )}
                          size={16}
                        />
                      </li>
                    </Link>
                    <Link
                      href={`/${locale}/${RoutesName.tradesHistory}`}
                      prefetch
                    >
                      <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                        <p> {t("closedTradesHistory")}</p>
                        <BiChevronRight
                          className={clsx(
                            "hidden group-hover:block",
                            rtlLanguages.includes(locale as localeType) &&
                              "rotate-180",
                          )}
                          size={16}
                        />
                      </li>
                    </Link>
                    <Link
                      href={`/${locale}/${RoutesName.transactionsHistory}`}
                      prefetch
                    >
                      <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                        <p> {t("withdrawAndDepositHistory")}</p>
                        <BiChevronRight
                          className={clsx(
                            "hidden group-hover:block",
                            rtlLanguages.includes(locale as localeType) &&
                              "rotate-180",
                          )}
                          size={16}
                        />
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CustomDropdown>
      </li>

      <li
        className={clsx(
          "flex h-full items-center gap-3",
          dropdown === "company" && "border-b-4 border-blue-500",
        )}
      >
        <CustomDropdown
          className="-bottom-8!"
          toggler={
            <>
              <p
                className={clsx(
                  hasHeaderBg && !hasScrolled
                    ? "text-mainTextDark dark:text-mainTextDark"
                    : "text-mainText dark:text-mainTextDark",

                  dropdown === "company" && "text-blue-500!",
                )}
              >
                {t("company")}
              </p>
              <BiChevronDown
                className={clsx(
                  "min-h-6",
                  hasHeaderBg && !hasScrolled
                    ? "text-mainTextDark dark:text-mainTextDark"
                    : "text-mainText dark:text-mainTextDark",

                  dropdown === "company" && "text-blue-500!",
                )}
                size={24}
              />
            </>
          }
          setIsSelectOpen={(isVisible) =>
            isVisible ? setDropdown("company") : setDropdown("")
          }
        >
          <div className="w-52 overflow-hidden rounded-xl bg-mainBackground p-6 text-sm dark:bg-mainBackgroundDark">
            <ul className="space-y-4 text-mainText dark:text-mainTextDark">
              <Link href={`#`} prefetch>
                <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                  <p>{t("about")}</p>
                  <BiChevronRight
                    className={clsx(
                      "hidden group-hover:block",
                      rtlLanguages.includes(locale as localeType) &&
                        "rotate-180",
                    )}
                    size={16}
                  />
                </li>
              </Link>
              <Link href={`/${locale}/${RoutesName.tradeRules}`} prefetch>
                <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                  <p>{t("tradeRules")}</p>
                  <BiChevronRight
                    className={clsx(
                      "hidden group-hover:block",
                      rtlLanguages.includes(locale as localeType) &&
                        "rotate-180",
                    )}
                    size={16}
                  />
                </li>
              </Link>
              <Link href={`#`} prefetch>
                <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                  <p>{t("regulation")}</p>
                  <BiChevronRight
                    className={clsx(
                      "hidden group-hover:block",
                      rtlLanguages.includes(locale as localeType) &&
                        "rotate-180",
                    )}
                    size={16}
                  />
                </li>
              </Link>
              <Link href={`#`} prefetch>
                <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                  <p>{t("help")}</p>
                  <BiChevronRight
                    className={clsx(
                      "hidden group-hover:block",
                      rtlLanguages.includes(locale as localeType) &&
                        "rotate-180",
                    )}
                    size={16}
                  />
                </li>
              </Link>
              <Link href={`#`} prefetch>
                <li className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-blue-400/20">
                  <p>{t("support")}</p>
                  <BiChevronRight
                    className={clsx(
                      "hidden group-hover:block",
                      rtlLanguages.includes(locale as localeType) &&
                        "rotate-180",
                    )}
                    size={16}
                  />
                </li>
              </Link>
            </ul>
          </div>
        </CustomDropdown>
      </li>
    </ul>
  );
};

export default DropdownMenusComponent;
