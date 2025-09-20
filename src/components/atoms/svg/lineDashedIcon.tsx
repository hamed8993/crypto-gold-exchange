const LineDashedIcon = ({
  props,
  color = "#000",
}: {
  props?: React.SVGProps<SVGSVGElement>;
  size?: number;
  color?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="1"
    viewBox="0 0 460 1"
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeDasharray="9 9"
      strokeWidth={0.75}
      d="M0 0.5 H460"
      opacity={0.1}
    />
  </svg>
);
export default LineDashedIcon;
