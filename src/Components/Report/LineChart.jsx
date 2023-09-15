import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import {
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { GiIdCard, GiPayMoney } from "react-icons/gi";
import { BsGraphUpArrow, BsPlusLg, BsShop } from "react-icons/bs";
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
import { PiCalculatorDuotone, PiCoinsDuotone } from "react-icons/pi";
import DropDownBtn from "../Components/DropDownBtn";
import { Loader } from "@mantine/core";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";
import LineChart from "../Components/Report/LineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = () => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Hide the legend (color selection option)
          },
          title: {
            display: false,
            text: "Chart.js Line Chart",
          },
        },
      };
    
      const labels = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ];
    
      const data = {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: [10, 20, 15, 30, 25, 12, 28, 22, 18, 35, 27, 20],
            // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
  return (
    <div className=" ms-10 flex items-center">
          {/* chart section */}
          <div className=" w-[70%]">
            <div className=" flex items-center justify-between">
              <p className="text-3xl  tracking-wide">Monthly Sales</p>
              <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
          <button className="border-r border-[#3f4245]  w-[5rem] py-2  ">
            <Link className=" text-center text-md text-[#f5f5f5] ">Year</Link>
          </button>
          <button className="border-r border-[#3f4245]   w-[5rem] py-2  ">
            <Link className=" text-center text-md text-[#f5f5f5] ">Month</Link>
          </button>
          <button className="border-r border-[#3f4245]  w-[5rem] py-2 ">
            <Link className=" text-center text-md text-[#f5f5f5] ">Week</Link>
          </button>
        </div>
            </div>
            <div>
              <Line data={data} options={options} />
            </div>
          </div>
          {/* info section */}
          <div className="w-[30%] mx-8">
            <div className=" w-[50%]">
              <div className=" my-5">
                <p className=" text-2xl  font-thin tracking-wide">982.85k</p>
                <p className=" tracking-tight font-thin text-sm">Kyats</p>
              </div>
              <div className=" my-3">
                <div className=" flex gap-3 items-center justify-between mb-3 ">
                  <div className="bg-[#434446] rounded-lg px-3 py-3">
                    <BsGraphUpArrow className=" text-[#07f51b] text-xl font-extrabold  " />
                  </div>
                  <div>
                    <p className=" text-lg font-thin  tracking-wide  ">
                      48,568,20
                    </p>
                    <p className=" tracking-tight font-thin text-sm">
                      Total Profit
                    </p>
                  </div>
                </div>
                <div className=" flex  gap-3  items-center justify-between mb-3 ">
                  <div className="bg-[#434446] rounded-lg px-3 py-3">
                    <PiCoinsDuotone className=" text-blue-500 text-xl font-extrabold  " />
                  </div>
                  <div>
                    <p className=" text-lg font-thin  tracking-wide  ">
                      36,453.25
                    </p>
                    <p className=" tracking-tight font-thin text-sm">
                      Total Income
                    </p>
                  </div>
                </div>
                <div className=" flex  gap-3  items-center justify-between mb-3">
                  <div className="bg-[#434446] rounded-lg px-3 py-3">
                    <GiPayMoney className="   text-amber-400 text-xl font-extrabold  " />
                  </div>
                  <div>
                    <p className=" text-lg font-thin  tracking-wide  ">
                      2,453.45
                    </p>
                    <p className=" tracking-tight font-thin text-sm">
                      Total Expense
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mb-2">
              <button className="py-2 px-2 w-full text-md tracking-wider rounded-md bg-blue-500">
                SALE REPORT
              </button>
            </div>
          </div>
        </div>
  )
}

export default LineChart
