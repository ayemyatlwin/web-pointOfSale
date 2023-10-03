import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useGetWeeklySaleReportQuery } from "../../Feature/API/reportSaleApi";
import Cookies from "js-cookie";
ChartJS.register(...registerables);

const DonutChart = () => {
  const token = Cookies.get("token");
  const weeklyData = useGetWeeklySaleReportQuery(token);
  const brandSales = weeklyData?.data?.brand_sales;
  // console.log(brandSales);
  const brandPercentage=brandSales?.map((value)=>{
    return parseFloat(value?.percentage.replace('%', '')) 
  })
  // console.log(brandPercentage);
  const brandName = brandSales?.map((item) => {
    const maxLength = 3; // Set the maximum length for labels
    const truncatedName =
      item?.brand_name.length > maxLength
        ? item?.brand_name.substring(0, maxLength)  // Truncate long labels
        : item?.brand_name.capitalize();
    return truncatedName;
  });
  // console.log(brandName);

  let data = null; // Initialize data as null or an empty object depending on your requirements

  if (brandName && brandName.length > 0) {
    data = {
      labels: [...brandName],
      datasets: [
        {
          data: [...brandPercentage], // Example data
          backgroundColor: ["#8AB4B8", "#6A88b8", "#36A2EB", "#e8eaed","#404d64"],
          borderColor: "rgba(0, 0, 0, 0)", // Set the border color to transparent
          borderWidth: 0,
        },
      ],
    };
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
          const currentValue = dataset.data[tooltipItem.index];
          const percentage =
            ((currentValue / total) * 100).toFixed(2) + "%";
          return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage})`;
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          fontSize: 14,
          fontColor: "black",
        },
      },
    },
  };

  // Conditionally render the chart if brandName is available
  return (
    <div className="py-3 px-2">
      {brandName && brandName.length > 0 ? (
        <Doughnut data={data} options={options} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default DonutChart;
