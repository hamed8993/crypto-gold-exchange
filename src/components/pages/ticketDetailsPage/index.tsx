"use client";

import CustomDropzone from "@/components/atoms/customDropzone";
import CustomInput from "@/components/atoms/customInput";
import PwaPageLayout from "@/components/organisms/layout";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function TicketDetailsPage() {
  const t = useTranslations();
  const [selectedImages, setSelectedImages] = useState([]);
  const handleRemoveImage = (file: never) => {
    setSelectedImages(selectedImages.filter((item) => item !== file));
  };

  const data = [
    {
      articles: {
        attachments: {
          fileName: "",

          uuid: "",
        },

        createdAt: "",

        creator_type: "customer",

        message:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",

        updatedAt: "",

        uuid: "111111111",
      },
    },
    {
      articles: {
        attachments: {
          fileName: "",

          uuid: "",
        },

        createdAt: "",

        creator_type: "owner",

        message:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",

        updatedAt: "",

        uuid: "111111111",
      },
    },
    {
      articles: {
        attachments: {
          fileName: "",

          uuid: "",
        },

        createdAt: "",

        creator_type: "owner",

        message:
          "لورم ایپسوم متن ساهوم از صنعت چاپ و با استفادف بهبود ابزارهای کاربردی می باشد",

        updatedAt: "",

        uuid: "111111111",
      },
    },
  ];

  return (
    <PwaPageLayout hasBackChevron hasFooter={false} title={t("ticket")}>
      <div className="flex h-[calc(100vh-110px)] flex-col shadow-none">
        <div className="flex h-full flex-col rounded-lg">
          {data.map((item, index) => {
            return (
              <div
                className={clsx(
                  "mt-3 flex w-fit flex-col items-start justify-start rounded-lg p-4",
                  item.articles.creator_type === "customer"
                    ? "bg-surface self-start text-start"
                    : "bg-accentText self-end text-end",
                )}
                key={index}
              >
                <span className="text-mainText text-sm">
                  {item.articles.message}
                </span>
                <div
                  className={clsx(
                    "mt-2 flex w-full items-center",
                    item.articles.creator_type === "customer"
                      ? "justify-end"
                      : "justify-start",
                  )}
                >
                  <span className="text-mainText text-sm">12:45</span>
                </div>
              </div>
            );
          })}
        </div>
        {selectedImages.length > 0 && (
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
        )}
        <div className="fixed bottom-0 flex min-h-16 w-full items-center justify-between pe-3">
          <CustomInput placeholder={t("writeYourMessage")} />
          <div className="flex h-10 w-14 items-center justify-center">
            <CustomDropzone
              maxFiles={5}
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
              <IoMdAttach className="text-accentText h-6 w-6" />
            </CustomDropzone>
          </div>
          <div className="flex h-10 w-14 items-center justify-center">
            <FiSend className="text-mainBrand h-6 w-6" />
          </div>
        </div>
      </div>
    </PwaPageLayout>
  );
}

export default TicketDetailsPage;
