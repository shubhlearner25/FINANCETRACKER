"use client";

import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useCurrency from "../hooks/useCurrency";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data = [], theme, label = "Amount" }) => {
  const dark = theme === "dark";
  const { currency } = useCurrency();

  /** 🎨 Orange + White Color Palette */
  const palette = {
    line: dark ? "rgba(255,140,0,0.9)" : "rgba(255,165,0,0.9)", // Orange stroke
    fill: dark ? "rgba(255,165,0,0.25)" : "rgba(255,180,0,0.2)", // Light orange area
    text: dark ? "rgba(255,255,255,0.92)" : "rgba(20,20,20,0.92)",
    grid: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
  };

  /** Build sorted dataset */
  const chartData = useMemo(() => {
    const sortedDates = [...new Set(data.map((i) => i.date))].sort();
    const mapped = new Map(data.map((i) => [i.date, i.total]));

    return {
      labels: sortedDates.map((d) =>
        new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ),
      datasets: [
        {
          label,
          data: sortedDates.map((d) => mapped.get(d) || 0),
          borderColor: palette.line,
          backgroundColor: palette.fill,
          tension: 0.35,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [data, label, palette.line, palette.fill]);

  /** Chart settings */
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: palette.text,
          },
        },
        title: {
          display: true,
          text: "Daily Activity (Last 30 Days)",
          color: palette.text,
          font: { size: 17, weight: "600" },
        },
        tooltip: {
          callbacks: {
            label: ({ parsed, dataset }) =>
              `${dataset.label}: ${currency.symbol}${parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: palette.text,
            callback: (value) => `${currency.symbol}${value}`,
          },
          grid: {
            color: palette.grid,
          },
          title: {
            display: true,
            text: `Amount (${currency.symbol})`,
            color: palette.text,
            font: { size: 13 },
          },
        },
        x: {
          ticks: {
            color: palette.text,
          },
          grid: {
            color: palette.grid,
          },
          title: {
            display: true,
            text: "Date",
            color: palette.text,
            font: { size: 13 },
          },
        },
      },
      layout: {
        padding: { top: 10, bottom: 22, left: 8, right: 8 },
      },
    }),
    [palette, currency]
  );

  return <Line data={chartData} options={options} />;
};

export default LineChart;
