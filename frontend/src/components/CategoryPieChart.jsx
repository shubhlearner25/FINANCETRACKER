import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components once
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ data = [], theme, label = "Expenses by Category" }) => {
  // Generate dynamic color palette (instead of hardcoding)
  const palette = useMemo(() => {
    const baseColors = [
      "255, 99, 132",
      "54, 162, 235",
      "255, 206, 86",
      "75, 192, 192",
      "153, 102, 255",
      "255, 159, 64",
    ];

    return {
      fill: baseColors.map((c) => `rgba(${c}, 0.7)`),
      border: baseColors.map((c) => `rgba(${c}, 1)`),
    };
  }, []);

  // Chart dataset
  const chartData = useMemo(
    () => ({
      labels: data.map((entry) => entry.name),
      datasets: [
        {
          label,
          data: data.map((entry) => entry.total),
          backgroundColor: palette.fill,
          borderColor: palette.border,
          borderWidth: 1,
        },
      ],
    }),
    [data, label, palette]
  );

  // Theme & legend styling
  const options = useMemo(() => {
    const dark = theme === "dark";
    const textColor = dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)";

    return {
      cutout: "60%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: textColor,
            padding: 16,
          },
        },
      },
    };
  }, [theme]);

  return <Pie data={chartData} options={options} />;
};

export default CategoryPieChart;
