import CustomInput from "@/components/atoms/customInput";
import DrawerPageInstant from "@/components/atoms/drawerPageInstant";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { RiQrScan2Line } from "react-icons/ri";
import { useWithdrawContext } from "../../provider";

const QrcodeScanner = dynamic(() => import("@/components/atoms/Scanner"), {
  ssr: false,
});

function AddressSection() {
  const t = useTranslations();

  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string>("");

  const { watch, setValue } = useWithdrawContext();

  const address = watch("address");

  useEffect(() => {
    if (!address) {
      setValue("address", scanResult);
      setIsScannerOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, scanResult]);

  const deleteAddress = () => {
    setValue("address", "");
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setValue("address", text);
  };

  return (
    <>
      <div className="mt-3 flex h-14 w-full items-center justify-end px-2">
        <div className="flex items-center justify-start gap-2">
          <div
            className="flex h-10 w-10 items-center justify-center"
            onClick={() => {
              setValue("address", "");
              setScanResult("");
              setTimeout(() => {
                setIsScannerOpen(true);
              }, 500);
            }}
          >
            <RiQrScan2Line className="text-mainBrandAlternative h-5 w-5" />
          </div>
          <p className="font-english text-accentText text-justify">{"|"}</p>
          <div
            className="flex h-10 w-10 items-center justify-center"
            onClick={handlePaste}
          >
            <MdContentCopy className="text-mainBrandAlternative h-5 w-5" />
          </div>
          <p className="font-english text-accentText text-justify">{"|"}</p>
          <div
            className="flex h-10 w-10 items-center justify-center"
            onClick={deleteAddress}
          >
            <FaRegTrashCan className="text-negative h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="border-accentText50 relative mt-2 flex h-14 w-full items-center justify-between rounded-lg border">
        <div className="bg-secondBackground absolute -top-6 right-1 flex items-center justify-center px-5 py-3">
          <p className="text-mainText text-sm">{`${t("withdrawAddress")} `}</p>
        </div>

        <CustomInput
          inputClassName={
            address
              ? "w-full font-english border-none text-center rtl:text-start! ltr:text-start! "
              : "w-full placeholder:text-xs! text-[10px]! border-none"
          }
          onChange={(e) => {
            setValue("address", e.target.value);
          }}
          placeholder={t("enterWithdrawAddress")}
          value={address}
          wrapperClassName="px-2"
        />
      </div>

      <DrawerPageInstant
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      >
        <QrcodeScanner onScanSuccess={(value) => setScanResult(value)} />
      </DrawerPageInstant>
    </>
  );
}

export default AddressSection;
