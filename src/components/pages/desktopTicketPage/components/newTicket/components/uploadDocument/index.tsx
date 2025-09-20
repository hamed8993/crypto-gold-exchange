import CustomDropzone from "@/components/atoms/customDropzone";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { IoAdd } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

interface UploadDocumentProps {
  selectedImages: Array<never>;
  setSelectedImages: Dispatch<SetStateAction<never[]>>;
  handleRemoveImage: (file: never) => void;
}

const UploadDocument = ({
  handleRemoveImage,
  selectedImages,
  setSelectedImages,
}: UploadDocumentProps) => {
  const t = useTranslations();

  return (
    <CustomDropzone
      maxFiles={5}
      classNames={{ root: "w-full" }}
      onDrop={(file) =>
        selectedImages.length < 5 &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setSelectedImages([
          ...selectedImages,
          ...file.slice(0, 5 - selectedImages?.length),
        ])
      }
    >
      {selectedImages.length > 0 ? (
        <div
          className={
            "border-accentText50 mt-2 flex min-h-32 w-full flex-wrap items-center justify-start gap-2 overflow-x-auto rounded-xl border border-dashed p-2"
          }
        >
          <div
            className={
              "border-accentText50 mx-2 flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border border-dashed p-2"
            }
          >
            <IoAdd className="text-accentText text-xl" />
            <p className="text-mainText text-[10px]">{t("selectImages")}</p>
          </div>
          {selectedImages.map((src, i) => {
            const imageUrl = URL.createObjectURL(src);
            return (
              <div key={i} className={"relative mx-2 mt-2 h-20 w-20"}>
                <RxCross2
                  onClick={() => {
                    handleRemoveImage(src);
                  }}
                  className="text-negative absolute top-1 right-1 z-2 h-5 w-5"
                />
                <Image
                  alt={src}
                  onLoad={() => URL.revokeObjectURL(imageUrl)}
                  src={imageUrl}
                  width={80}
                  height={80}
                  className="h-20 w-20"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border-accentText50 mt-2 flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed">
          <IoAdd className="text-accentText text-3xl" />
          <p className="text-mainText mt-2 text-sm">{t("selectImages")}</p>
        </div>
      )}
    </CustomDropzone>
  );
};

export default UploadDocument;
