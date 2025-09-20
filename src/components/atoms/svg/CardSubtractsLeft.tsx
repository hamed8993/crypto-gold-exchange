const CardSubtractsLeft = ({
  className,
  color,
}: {
  className: string;
  color: string;
}) => (
  <svg
    className={className}
    width="8"
    height="50"
    viewBox="0 0 8 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="scale(-1, 1)"
    style={{ transformOrigin: "center" }}
  >
    <path
      d="M6.44727 2.78809C6.47509 3.5014 6.50306 4.33837 6.52637 5.28027C6.64222 9.96204 6.70023 17.1758 6.7002 24.4531C6.70016 31.7303 6.64229 39.0677 6.52637 43.9971C6.49363 45.3892 6.45383 46.586 6.41211 47.5342C5.8343 43.5341 4.65378 40.3352 3.48047 37.21C2.15902 33.6902 0.852102 30.2684 0.392578 25.8584C-0.0627441 21.4886 1.228 18.2438 2.7793 14.6299C4.19339 11.3356 5.81605 7.74757 6.44727 2.78809Z"
      fill={color}
      stroke={color}
      strokeWidth="0.6"
    />
    <path
      d="M6.25 5.76562L7 1.5L7.75 6V46L7 49L6.23186 44.75L6 44V44C5.83416 43.4273 5.75 42.8341 5.75 42.2379V41V36V26V16V11V8.5L6 7.5L6.25 6.5V5.76562Z"
      fill={color}
    />
  </svg>
);
export default CardSubtractsLeft;
