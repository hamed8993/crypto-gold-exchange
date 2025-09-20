"use client";

import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface CustomHalfDonutChartProps {
  data: number[];
  colors: string[];
  className?: string;
  width?: number;
  height?: number;
}

const CustomHalfDonutChart: React.FC<CustomHalfDonutChartProps> = ({
  data,
  colors,
  width = 200,
  height = 100,
  className,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const radius = Math.min(width, height * 2) / 2;

    const pie = d3
      .pie()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .value((d) => (d < 20 ? 20 : d))
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<number>>()
      .innerRadius(radius * 0.7)
      .outerRadius(radius);

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const group = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height})`);

    const arcs = pie(data);

    // Draw paths
    group
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", arc as any)
      .attr("fill", (_, i) => colors[i] || "gray")
      .attr("opacity", 0.8);

    // Draw labels
    group
      .selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", (d) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const [x, y] = arc.centroid(d);
        const angle = (d.startAngle + d.endAngle) / 2;
        let rotation = (angle * 180) / Math.PI - 180;
        if (rotation > 90 || rotation < -90) {
          rotation += 180;
        }
        return `translate(${x}, ${y}) rotate(${rotation})`;
      })
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "white")
      .style("font-size", "10px")
      .style("direction", "ltr")
      .style("font-family", "sans-serif")
      .style("font-weight", "light")
      .text((d) => `${d.data} %`);
  }, [data, colors, width, height]);

  return (
    <svg ref={ref} className={className} width={width} height={height}></svg>
  );
};

export default CustomHalfDonutChart;
