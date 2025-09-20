import { useTranslations } from "next-intl";

interface OrderIdRowProps {
  id: string;
}

function OrderIdRow({ id }: OrderIdRowProps) {
  const t = useTranslations();
  return (
    <div className="border-b-accentText bg-secondBackground flex min-h-10 w-full items-center justify-center border-b">
      <div className="flex items-center justify-start gap-1">
        <p className="text-accentText text-xs">{t("orderId")}</p>
        <p className="font-english text-mainText text-xs">{id}</p>
      </div>
    </div>
  );
}

export default OrderIdRow;
