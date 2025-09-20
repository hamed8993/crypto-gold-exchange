"use client";

import ButtonDefault from "@/shared/atoms/buttonDefault";
import InputDefault from "@/shared/atoms/inputDefault";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

function SignUpInput() {
  const t = useTranslations();

  const [value, setValue] = useState<string>("");
  return (
    <div className="mx-auto flex w-fit gap-2 rounded-xl border border-borderDefault bg-bgSurface p-2 py-3 pe-4">
      <InputDefault
        placeholder={t("signUpInputPlaceHolder")}
        className="h-10! border-0! py-0! placeholder:text-textSecondary"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ButtonDefault
        variant="primary"
        className="h-10! w-[142px]!"
        icon={<BsArrowLeft className="ltr:rotate-180" />}
        iconPosition="end"
      >
        <span className="text-constantLight">{t("register")}</span>
      </ButtonDefault>
    </div>
  );
}

export default SignUpInput;
