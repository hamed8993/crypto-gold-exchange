import * as React from "react";
const CreditCard = ({
  props,
  size,
  color,
}: {
  props?: React.SVGProps<SVGSVGElement>;
  size?: number;
  color?: string;
}) => (
  <svg
    fill={color}
    height={size || 80}
    width={size || 80}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Layer_2" data-name="Layer 2">
      <path d="m27 6h-22a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-14a3 3 0 0 0 -3-3zm-22 2h22a1 1 0 0 1 1 1v2h-24v-2a1 1 0 0 1 1-1zm22 16h-22a1 1 0 0 1 -1-1v-10h24v10a1 1 0 0 1 -1 1zm-16-3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1z" />
    </g>
  </svg>
);
export default CreditCard;
