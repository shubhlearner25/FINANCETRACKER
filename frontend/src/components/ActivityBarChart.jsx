import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components once
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivityBarChart = ({ expensesData = [], incomeData = [], theme }) => {
  const darkMode = theme === "dark";

  // Define colors based on theme
  const colors = useMemo(
    () => ({
      text: darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
      grid: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      income: darkMode ? "rgba(34, 197, 94, 0.8)" : "rgba(34, 197, 94, 0.7)",
      expenses: darkMode ? "rgba(239, 68, 68, 0.8)" : "rgba(239, 68, 68, 0.7)",
    }),
    [darkMode]
  );

  // Process chart data
  const chartData = useMemo(() => {
    // Extract and merge all dates
    const mergedDates = [
      ...expensesData.map((d) => d.date),
      ...incomeData.map((d) => d.date),
    ];

    const uniqueSortedDates = [...new Set(mergedDates)].sort();

    const expenseMap = new Map(expensesData.map((e) => [e.date, e.total]));
    const incomeMap = new Map(incomeData.map((i) => [i.date, i.total]));

    return {
      labels: uniqueSortedDates,
      datasets: [
        {
          label: "Daily Income",
          data: uniqueSortedDates.map((d) => incomeMap.get(d) || 0),
          backgroundColor: colors.income,
          borderRadius: 4,
        },
        {
          label: "Daily Expenses",
          data: uniqueSortedDates.map((d) => expenseMap.get(d) || 0),
          backgroundColor: colors.expenses,
          borderRadius: 4,
        },
      ],
    };
  }, [expensesData, incomeData, colors]);

  // Chart configuration
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: colors.text },
        },
        title: {
          display: true,
          text: "Daily Activity (Last 30 Days)",
          color: colors.text,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: colors.text },
          grid: { color: colors.grid },
        },
        y: {
          stacked: true,
          ticks: { color: colors.text },
          grid: { color: colors.grid },
        },
      },
    }),
    [colors]
  );

  return <Bar options={options} data={chartData} />;
};

export default ActivityBarChart;
