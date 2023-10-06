import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useGetWeeklySaleReportQuery } from "../../Feature/API/reportSaleApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(...registerables);

const VertiChart = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { dataType } = useSelector((state) => state.reportSaleSlice);

  const weeklyData = useGetWeeklySaleReportQuery({ token, type: dataType });
  console.log(weeklyData);

  

  const sale_records = weeklyData?.data?.sale_records;
  console.log(sale_records);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[date.getDay()];
    return day;
  };

  const formatNumeralDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const numeralDay = date.getDate();
    return numeralDay;
  };

  const formatMonth = (isoDateString) => {
    const date = new Date(isoDateString);
    const monthNames = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    const month = monthNames[date.getMonth()];
    return month;
  };

  const getLabelsByDataType = () => {
    switch (dataType) {
      case "weekly":
        return sale_records?.map((day) => formatDate(day?.created_at));
      case "monthly":
        return sale_records?.map((date) => formatNumeralDate(date?.created_at));
      case "yearly":
        return sale_records?.map((month) => formatMonth(month?.created_at));
      default:
        return [];
    }
  };

  const dayLabels = getLabelsByDataType();
  console.log(dayLabels);

  const dataVertValue = sale_records?.map((data) => data?.total_net_total);
  console.log(dataVertValue);

  
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
