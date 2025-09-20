interface LongShortSVGProps {
  height?: string;
  width?: string;
}

const LongShortSVG = ({ height, width }: LongShortSVGProps) => {
  return (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 1707 1707"
      xmlns="http://www.w3.org/2000/svg"
      height={height || "50"}
      width={width || "50"}
      style={{
        fill: "white",
      }}
    >
      <g id="Layer_x0020_1">
        <path d="m553 753c-47 0-72-57-38-91l83-82h-296c-70 0-70-107 0-107l296 1-83-83c-50-50 26-125 75-76l175 175c20 21 20 54-1 75l-174 173c-10 10-24 15-37 15zm61 291h-321c-160 0-292-131-292-292v-450c0-161 131-292 292-292h442c161 0 292 131 292 292v284l315-351c47-53 127 18 80 71l-329 365 321 1c161 0 292 131 292 292v441c0 161-131 292-292 292h-441c-161 0-292-131-292-292v-276l-284 316c-45 52-127-18-79-71zm306-340v-402c0-102-83-185-185-185h-442c-102 0-186 83-186 185v450c0 103 84 186 186 186h417zm-132 307v394c0 102 83 185 185 185h441c102 0 185-83 185-185v-441c0-103-83-186-185-186h-417zm618 226h-296l83 83c50 50-26 125-76 76l-174-174c-21-22-21-57 4-79l171-170c50-49 124 27 75 76l-83 82h296c70 0 70 106 0 106z" />
      </g>
    </svg>
  );
};

export default LongShortSVG;
