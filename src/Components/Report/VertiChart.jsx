import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const VertiChart = () => {
  const data = {
    labels: [
      "S",
      "M",
      "T",
      "W",
      "T",
      "F",
      "S"
    ],
    datasets: [
      {
        label: "Vertical Bar Chart Example",
        backgroundColor: ["#3f4249","#3f4249","#8AB4F8","#3f4249","#3f4249","#3f4249","#3f4249"],
        borderColor: ["#3f4249","#3f4249","#8AB4F8","#3f4249","#3f4249","#3f4249","#3f4249"] ,
        borderWidth: 1,
        borderRadius: 5,
        data: [65, 59, 85, 65, 56,44,82],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
            display: false, // Hide the x-axis grid lines
          },
      },
      y: {
       
            display: false, // Hide the x-axis grid lines
          
      },
    },
    plugins: {
        legend: {
          display: false, // Hide the legend (color selection option)
        },
      },
  };

  return (
    <div>
     
      <Bar data={data} options={options} />
    </div>
  );
};

export default VertiChart;
