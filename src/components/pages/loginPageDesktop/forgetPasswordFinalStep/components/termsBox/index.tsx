import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import CustomCheckbox from "@/shared/atoms/customCheckBox";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";

function TermsBox() {
  const t = useTranslations();

  const { locale } = useUrl();
  const { setValue, watch } = useLoginContext();
  const isTermsAgreed = watch("isTermsAgreed");

  return (
    <div className="mt-4 flex w-full items-center gap-2">
      <CustomCheckbox
        onChange={() => {
          setValue("isTermsAgreed", !isTermsAgreed);
        }}
        value={isTermsAgreed || false}
      />
      <div className="flex cursor-default gap-1 text-sm">
        <p>{t("iAgreeWith")}</p>
        <a
          className="cursor-pointer text-textLink"
          href={`/${locale}/${RoutesName.terms}`}
        >
          {t("termsAndConditions")}
        </a>
        <p>{t("goldfinoTerms")}</p>
      </div>
    </div>
  );
}

export default TermsBox;
