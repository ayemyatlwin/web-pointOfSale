import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useGetWeeklySaleReportQuery } from "../../Feature/API/reportSaleApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(...registerables);

const VertiChart = () => {
  const token = Cookies.get("token");
  const { dataType } = useSelector((state) => state.reportSaleSlice);
  const weeklyData = useGetWeeklySaleReportQuery({ token, type: dataType });
  console.log(weeklyData);

  const sale_records = weeklyData?.data?.sale_records;
  // console.log(sale_records);

  const MonthFormat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
      let daysInMonth;
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      daysInMonth = 31; // January, March, May, July, August, October, December
    } else if (month === 2) {
      // February: Check for leap year
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth = 29; // Leap year
      } else {
        daysInMonth = 28; // Non-leap year
      }
    } else {
      daysInMonth = 30; // All other months
    }
      if (date.getDate() >= 1 && date.getDate() <= daysInMonth) {
      const daysArray = Array.from({ length: daysInMonth }, (_, index) => "D" + (index + 1));
      return daysArray;
    } else {
      return ["Invalid Date"]; 
    }
  };
  

  const getLabelsByDataType = () => {
    switch (dataType) {
      case "weekly":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "monthly":
        return MonthFormat();;
      case "yearly":
        return [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      default:
        return [];
    }
  };

  const dayLabels = getLabelsByDataType();
  // console.log(dayLabels);

  const dataVertValue = sale_records?.map((data) => data?.total_net_total);
  // console.log(dataVertValue);

  
  const maxIndex = dataVertValue ? dataVertValue.indexOf(Math.max(...dataVertValue)) : -1;

  const backgroundColors = dataVertValue?.map((value, index) =>
    index === maxIndex ? "#8AB4F8" : "#3f4249"
  );

  const data = {
    labels: dayLabels,
    datasets: [
      {
        label: "Vertical Bar Chart Example",
        backgroundColor: backgroundColors,
        borderColor: "#3f4249",
        borderWidth: 1,
        borderRadius: 5,
        data: dataVertValue,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
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
