import DepositIcon from "@/components/atoms/svg/depositIcon";
import TransferIcon from "@/components/atoms/svg/transferIcon";
import WithdrawIcon from "@/components/atoms/svg/withdrawIcon";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BottomButton from "../../../../../../atoms/portfolioButtons";
import TransferDrawer from "../../../transferDrawer";

interface ButtonsRowProps {
  coin: string;
}

function ButtonsRow({ coin }: ButtonsRowProps) {
  const { locale } = useUrl();
  const t = useTranslations();

  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const buttonsList = [
    {
      icon: <DepositIcon size={20} color={"#fff"} />,
      title: t("deposit"),
      href: `/${locale}/${RoutesName.deposit}`,
      className: "bg-positive",
      isButton: false,
      onClick: () => {},
    },
    {
      icon: <WithdrawIcon size={20} color={"#fff"} />,
      title: t("withdraw"),
      href: `/${locale}/${RoutesName.withdraw}`,
      className: "bg-positive",
      isButton: false,
      onClick: () => {},
    },
    {
      icon: <TransferIcon size={20} color={"#fff"} />,
      title: t("transfer"),
      href: "",
      className: "bg-mainBrandAlternative",
      isButton: true,
      onClick: (coin: string) => {
        setSelectedAsset(coin);
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      },
    },
  ];

  return (
    <div className="mb-3 mt-2 flex h-fit min-h-10 w-full items-center justify-start gap-2">
      {buttonsList.map((item, index) => {
        return (
          <BottomButton
            key={index}
            href={item?.href}
            icon={item?.icon}
            title={item?.title}
            className={item?.className || ""}
            onClick={() => {
              if (item.isButton) {
                item.onClick(coin);
              }
            }}
          />
        );
      })}
      <TransferDrawer
        asset={selectedAsset}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default ButtonsRow;
