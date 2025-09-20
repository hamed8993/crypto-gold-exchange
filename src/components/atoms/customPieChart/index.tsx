/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface PieChartProps {
  width?: number;
  height?: number;
  data: { label: string; value: number; color: string }[];
  innerRadius?: number; // for donut charts
  outerRadius?: number;
}

const CustomPieChart: React.FC<PieChartProps> = ({
  width = 300,
  height = 300,
  data,
  innerRadius = 0,
  outerRadius,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length) return;

    const w = width;
    const h = height;
    const radius = outerRadius || Math.min(w, h) / 2;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const group = svg
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`);

    const allZero = data.every((d) => d.value === 0);
    if (allZero) {
      const fallbackColor = "#98A2B3";
      group
        .append("circle")
        .attr("fill", "transparent")
        .attr("r", radius - 15)
        .attr("strokeWidth", 20)
        .attr("stroke", fallbackColor);
      return;
    }

    const pieGenerator = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value)
      .sort(null);

    const arcGenerator = d3
      .arc<d3.PieArcDatum<{ label: string; value: number; color: string }>>()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    const pieData = pieGenerator(data);

    group
      .selectAll("path")
      .data(pieData)
      .join("path")
      //@ts-ignore
      .attr("d", arcGenerator)
      //@ts-ignore
      .attr("fill", (d) => d.data.color)
      .attr("strokeWidth", 1);
  }, [data, width, height, innerRadius, outerRadius]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};
export default CustomPieChart;
