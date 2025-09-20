"use client";

import { QRCode } from "react-qrcode-logo";
interface CustomQrCodeProps {
  size?: number;
  logo?: string;
  qrText?: string;
  fgColor?: string;
  bgColor?: string;
  eyeColor?: string;
  wrapperClassName?: string;
  containerBorderRadius?: number;
  ecLevel?: "H" | "L" | "M" | "Q";
}

const CustomQrCode = ({
  size = 280,
  qrText,
  logo,
  ecLevel,
  bgColor,
  fgColor,
  eyeColor,
  containerBorderRadius,
}: CustomQrCodeProps) => {
  return (
    <>
      {qrText && (
        <QRCode
          bgColor={bgColor}
          ecLevel={ecLevel || "H"}
          removeQrCodeBehindLogo={true}
          eyeRadius={{ outer: [50, 50, 50, 50], inner: [50, 50, 50, 50] }}
          size={size}
          qrStyle={"dots"}
          logoWidth={size / 3}
          fgColor={fgColor}
          eyeColor={eyeColor}
          logoHeight={size / 3}
          style={{
            width: "100%",
            height: "auto",
            padding: 0,
            margin: 0,
            // marginBlock: 20,
            maxWidth: "size / 100%",
            borderRadius: containerBorderRadius ? containerBorderRadius : 0,
          }}
          value={qrText}
          logoPaddingStyle={"circle"}
          logoImage={logo}
        />
      )}
    </>
  );
};

export { CustomQrCode };
