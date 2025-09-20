"use client";
import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import CustomDropzone from "@/components/atoms/customDropzone";
import CustomInput from "@/components/atoms/customInput";
import CustomTextArea from "@/components/atoms/customTextArea";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { SlCloudUpload } from "react-icons/sl";
import { NewTicketContextProvider, useNewTicketContext } from "./provider";

interface NewTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewTicketDrawerComponent({ isOpen, onClose }: NewTicketDrawerProps) {
  const t = useTranslations();

  const { control, errors } = useNewTicketContext();
  const [selectedImages, setSelectedImages] = useState([]);
  const handleRemoveImage = (file: never) => {
    setSelectedImages(selectedImages.filter((item) => item !== file));
  };
  return (
    <CustomDrawer height="100%" isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full w-full flex-col items-center justify-between shadow-none">
        <div className="flex h-fit w-full flex-col items-start justify-start">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <CustomInput
                {...field}
                label={t("title")}
                placeholder={t("enterTitle")}
                maxLength={100}
                error={errors?.title?.message}
              />
            )}
            rules={{
              required: { value: true, message: t("pleaseFillInput") },
            }}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <CustomTextArea
                {...field}
                label={t("description")}
                wrapperClassName="mt-4"
                placeholder={t("enterText")}
                maxLength={1000}
                error={errors?.description?.message}
                rows={10}
                inputClassName="p-2 resize-none"
              />
            )}
            rules={{
              required: { message: t("pleaseFillInput"), value: true },
            }}
          />
          <CustomDropzone
            maxFiles={5}
            classNames={{ root: "w-full" }}
            onDrop={(file) =>
              selectedImages.length < 5 &&
              //@ts-expect-error
              setSelectedImages([
                ...selectedImages,
                ...file.slice(0, 5 - selectedImages?.length),
              ])
            }
          >
            <div className="border-border mt-3 flex h-28 w-full items-center justify-center rounded-lg border py-1">
              {selectedImages.length > 0 ? (
                <div
                  className={
                    "mt-2 flex w-full items-center justify-start overflow-x-auto"
                  }
                >
                  {selectedImages.map((src, i) => {
                    const imageUrl = URL.createObjectURL(src);
                    return (
                      <div key={i} className={"relative mx-2 h-20 w-20"}>
                        <RxCross2
                          onClick={() => {
                            handleRemoveImage(src);
                          }}
                          className="text-negative absolute top-1 right-1 h-5 w-5"
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
                <SlCloudUpload className="text-accentText h-10 w-10" />
              )}
            </div>
          </CustomDropzone>
        </div>
        <CustomButton className="text-mainText mb-2 flex h-14 w-full items-center justify-center text-sm">
          <span className="text-mainText text-sm">{t("confirm")}</span>
        </CustomButton>
      </div>
    </CustomDrawer>
  );
}

const NewTicketDrawer = ({ ...props }: NewTicketDrawerProps) => {
  return (
    <NewTicketContextProvider>
      <NewTicketDrawerComponent {...props} />
    </NewTicketContextProvider>
  );
};

export default NewTicketDrawer;
