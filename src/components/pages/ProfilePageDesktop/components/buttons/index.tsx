import PortfolioButtons from "@/components/atoms/portfolioButtons";
import DepositIcon from "@/components/atoms/svg/depositIcon";
import TransferIcon from "@/components/atoms/svg/transferIcon";
import WithdrawIcon from "@/components/atoms/svg/withdrawIcon";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TransferDrawer from "../transferDrawer";

interface ButtonsProps {
  coin: string;
}

function Buttons({ coin }: ButtonsProps) {
  const t = useTranslations();
  const { locale } = useUrl();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<string>("");

  const buttonsList = [
    {
      className: "bg-positive",
      href: `/${locale}/${RoutesName.deposit}`,
      icon: <DepositIcon color={"#fff"} size={20} />,
      isButton: false,
      onClick: () => {},
      title: t("deposit"),
    },
    {
      className: "bg-positive",
      href: `/${locale}/${RoutesName.withdraw}`,
      icon: <WithdrawIcon color={"#fff"} size={20} />,
      isButton: false,
      onClick: () => {},
      title: t("withdraw"),
    },
    {
      className: "bg-mainBrandAlternative",
      href: "",
      icon: <TransferIcon color={"#fff"} size={20} />,
      isButton: true,
      onClick: (coin: string) => {
        setSelectedAsset(coin);
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      },
      title: t("transfer"),
    },
  ];

  return (
    <div className="m-2 flex h-fit min-h-10 w-full items-center justify-center gap-2 self-center">
      {buttonsList.map((item, index) => {
        return (
          <PortfolioButtons
            className={item?.className || ""}
            href={item?.href}
            icon={item?.icon}
            key={index}
            onClick={(e) => {
              if (item.isButton) {
                e.preventDefault();
                item.onClick(coin);
              }
            }}
            title={item?.title}
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

export default Buttons;
