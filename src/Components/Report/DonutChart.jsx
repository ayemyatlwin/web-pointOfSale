import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);


const DonutChart = () => {
  const data = {
    labels: ["Melo", "City", "Pro", "Dutch"],
    datasets: [
      {
        data: [50, 100, 70, 140],
        backgroundColor: ["#8AB4B8", "#36A2EB", "#0e5a82", "#e8eaed"],
        borderColor: 'rgba(0, 0, 0, 0)', // Set the border color to transparent
        borderWidth: 0, 
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // Disable aspect ratio to adjust the chart size
    responsive: true, // Enable chart responsiveness
    title: {
      display: true,
      text: "Customized Doughnut Chart",
      fontSize: 40,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = ((currentValue / total) * 100).toFixed(2) + "%";
          return `${
            data.labels[tooltipItem.index]
          }: ${currentValue} (${percentage})`;
        },
      },
    },

    plugins: {
      legend: {
        position: "bottom", // Display the legend below the chart
        labels: {
            usePointStyle: true, // Use dot style for legend items
            fontSize: 14, // Adjust the font size of the legend labels
            fontColor: 'black',
            
          },
      },
    },
  };

  return (
    <div className="py-3 px-2 "  >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
