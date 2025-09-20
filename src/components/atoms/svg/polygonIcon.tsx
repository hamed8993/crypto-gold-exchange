interface PolygonIconProps {
  color?: string;
}
const PolygonIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  color = "#0A0B0D",
}: PolygonIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 40 41"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6211 1.35942C18.7278 0.213527 21.2716 0.213526 23.3782 1.35942L35.5911 8.00256C37.8666 9.24033 39.2831 11.6233 39.2831 14.2137V26.7863C39.2831 29.3767 37.8666 31.7597 35.5911 32.9974L23.3782 39.6406C21.2716 40.7865 18.7278 40.7865 16.6211 39.6406L4.40834 32.9974C2.13282 31.7597 0.716309 29.3767 0.716309 26.7863L0.716309 14.2137C0.716309 11.6233 2.13281 9.24033 4.40834 8.00256L16.6211 1.35942Z"
      fill={color}
    />
  </svg>
);
export default PolygonIcon;
