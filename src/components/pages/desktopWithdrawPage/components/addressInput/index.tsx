import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";

interface AddressInputProps {
  value: string;
  onChange: (...event: unknown[]) => void;
}

function AddressInput({ onChange, value }: AddressInputProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-end">
      <InputDesktop
        containerClassName="mt-0"
        label={t("address")}
        labelContainerClassName="!bg-mainBackground "
        placeholder={t("enterWithdrawAddress")}
        value={value}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
}

export default AddressInput;
