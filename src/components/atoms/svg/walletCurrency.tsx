import * as React from "react";
const WalletCurrencyIcon = ({
  props,
  size = 36,
  strokeColor = "#1A1A1A",
}: {
  props?: React.SVGProps<SVGSVGElement>;
  size?: number;
  strokeColor?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M32.256 12.373H5.244M23.252 18.375h3.001M20.25 27.379h7.504a4.502 4.502 0 0 0 4.502-4.502V10.872a4.502 4.502 0 0 0-4.502-4.502H9.746a4.502 4.502 0 0 0-4.502 4.502v6.002M14.363 30.38v-9.004"
    />
    <path
      stroke="#516AE4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.271 19.876v1.5M11.271 30.38v1.5"
    />
    <path
      stroke="#516AE4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.363 25.878H9.111a2.251 2.251 0 0 0-2.25 2.251v0a2.25 2.25 0 0 0 2.25 2.251h5.252v-4.502Z"
      clipRule="evenodd"
    />
    <path
      stroke="#516AE4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.363 21.376H9.636a2.251 2.251 0 0 0-2.25 2.251v0a2.25 2.25 0 0 0 2.25 2.251h4.727v-4.502 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default WalletCurrencyIcon;
