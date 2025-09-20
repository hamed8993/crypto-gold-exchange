"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface LineChartProps {
  areaColor?: string;
  data: { x: number; y: number }[];
  height?: number;
  lineColor: string;
  showArea?: boolean;
  width?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  areaColor,
  data,
  height = 200,
  lineColor,
  showArea = false,
  width = 400,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length) return;

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([
        Math.min(...data.map((item) => item.x)),
        Math.max(...data.map((item) => item.x)),
      ])
      .range([0, w]);

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.min(...data.map((item) => item.y)),
        Math.max(...data.map((item) => item.y)),
      ])
      .range([h, 0]);

    const line = d3
      .line<{ x: number; y: number }>()
      .x((item) => xScale(item.x))
      .y((item) => yScale(item.y))
      .curve(d3.curveCatmullRom);

    const area = d3
      .area<{ x: number; y: number }>()
      .x((item) => xScale(item.x))
      .y0(h)
      .y1((item) => yScale(item.y))
      .curve(d3.curveCatmullRom);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const group = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    if (showArea) {
      group
        .append("path")
        .datum(data)
        .attr("fill", areaColor || "transparent")
        .attr("d", area);
    }

    group
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("strokeWidth", 2)
      .attr("d", line);
  }, [data, width, height, lineColor, areaColor, showArea]);

  return (
    <svg
      className="overflow-visible"
      height={height}
      ref={svgRef}
      width={width}
    ></svg>
  );
};

export default LineChart;
