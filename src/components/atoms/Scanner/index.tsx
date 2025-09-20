"use client";

import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeScannerState,
} from "html5-qrcode";
import { useEffect, useRef } from "react";

interface Html5QrcodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const Html5QrcodeScanner = ({ onScanSuccess }: Html5QrcodeScannerProps) => {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const qrRegionId = "qr-scanner";

    html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          const rearCamera = devices.find((device) =>
            device.label.toLowerCase().includes("back"),
          );

          const cameraId = rearCamera?.id || devices[devices.length - 1].id;

          const config: Html5QrcodeCameraScanConfig = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          };

          html5QrCodeRef.current
            ?.start(
              cameraId,
              config,
              (decodedText: string) => {
                onScanSuccess(decodedText);
              },
              () => {},
            )
            .catch((err) => {
              console.error("Start error:", err);
            });
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });

    return () => {
      const state = html5QrCodeRef.current?.getState();
      if (
        state === Html5QrcodeScannerState.SCANNING ||
        state === Html5QrcodeScannerState.PAUSED
      ) {
        html5QrCodeRef.current
          ?.stop()
          .then(() => html5QrCodeRef.current?.clear())
          .catch((err) => console.error("Stop error:", err));
      } else {
        html5QrCodeRef.current?.clear();
      }
    };
  }, [onScanSuccess]);

  return <div id="qr-scanner" ref={scannerRef} className="h-full w-full" />;
};

export default Html5QrcodeScanner;
