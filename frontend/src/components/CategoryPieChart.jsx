import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({
  data = [],
  theme,
  label = "Expenses by Category",
}) => {
  // === NEW ORANGE + WHITE COLOR PALETTE ===
  const palette = useMemo(() => {
    const oranges = [
      "255,140,0",
      "255,99,71",
      "255,165,0",
      "255,179,71",
      "255,127,80",
      "255,200,120",
    ];

    return {
      fill: oranges.map((c) => `rgba(${c}, 0.75)`),
      border: oranges.map((c) => `rgba(${c}, 1)`),
    };
  }, []);

  // Build dataset
  const chartData = useMemo(
    () => ({
      labels: data.map((e) => e.name || "Unknown"),
      datasets: [
        {
          label,
          data: data.map((e) => e.total || 0),
          backgroundColor: palette.fill,
          borderColor: palette.border,
          borderWidth: 2,
        },
      ],
    }),
    [data, label, palette]
  );

  // Theme-aware legend
  const options = useMemo(() => {
    const dark = theme === "dark";
    const textColor = dark ? "#ffffffd9" : "#000000d9";

    return {
      cutout: "55%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: textColor,
            padding: 18,
          },
        },
      },
    };
  }, [theme]);

  return <Pie data={chartData} options={options} />;
};

export default CategoryPieChart;
