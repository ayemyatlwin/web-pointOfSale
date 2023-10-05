import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useGetWeeklySaleReportQuery } from "../../Feature/API/reportSaleApi";
import Cookies from "js-cookie";
ChartJS.register(...registerables);

const VertiChart = () => {
  const token=Cookies.get("token");
  const weeklyData=useGetWeeklySaleReportQuery(token);
  console.log(weeklyData);
  const sale_records= weeklyData?.data?.sale_records;
  console.log(sale_records);
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = dayNames[date.getDay()];
    return day;
};
const dayLabels=sale_records?.map((day)=> formatDate(day?.created_at) )
console.log(dayLabels);
const dataVertValue=sale_records?.map((data)=> data?.total_net_total
);
console.log(dataVertValue);
// let data=null;
  const data = {
    labels:dayLabels,
    datasets: [
      {
        label: "Vertical Bar Chart Example",
        backgroundColor: ["#3f4249","#3f4249","#8AB4F8","#3f4249","#3f4249","#3f4249","#3f4249"],
        borderColor: ["#3f4249","#3f4249","#8AB4F8","#3f4249","#3f4249","#3f4249","#3f4249"] ,
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
