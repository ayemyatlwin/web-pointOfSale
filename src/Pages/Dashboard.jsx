import React, { useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import {
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GiIdCard, GiPayMoney } from "react-icons/gi";
import { BsGraphUpArrow, BsPlusLg, BsShop } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import Recent from './Sale/Recent';
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
import { Loader } from "@mantine/core";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import {  useGetDashboardDataQuery } from "../Feature/API/dbApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
const [dataType,setDataType]=useState("weekly")
const token = Cookies.get("token");
const dbData=useGetDashboardDataQuery({token,dataType});
console.log(dbData);

const handleTypeChange=(type)=>{
  setDataType(type)
}


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

  const options = {
    scales: {
      x: {
        grid: {
          color: "#3f4245", // Set the border color for the x-axis
        },
      },
      y: {
        grid: {
          color: "#3f4245", // Set the border color for the x-axis
        },
        ticks: {
          beginAtZero: true,
          stepSize: 250, // Set the step size to 250
          max: 1000, // Set the maximum value to 1000
        },
      },
    },
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

  const data = {
    labels : dayLabels,
    datasets: [
      {
        label: "Dataset 1",
        data: dbData?.data?.sale_records.map((e)=>e.total_net_total), // Sample data
        borderColor: "#8AB4F8",
        borderWidth: 1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointBackgroundColor: "#f5f5f5",
      },
    ],
  };
 
  
  return (
    <div className=" ">
      {/* //breadcrumb */}
      <div>
        <Breadcrumb
          showBtn={false}
          title={"Overview"}
          firstRoute={"Overview"}
          secondRoute={"Products"}
        />
      </div>
      {/* first row */}
      <div className=" flex items-center justify-around">
        {/* total stock */}
        <div className="w-[20%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className=" my-[40px] flex gap-3 justify-between  ">
            <div
              className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
            >
              <AiOutlineShoppingCart
                className={`w-full h-full border text-[#8AB4F8] border-solid border-[#8AB4F8] bg-[#434446] rounded-full p-2`}
                alt=""
              />
            </div>
            <div className=" self-end">
              <p className=" text-[1.5rem] font-extrabold tracking-wide">
              {dbData?.data?.total_stocks}
              </p>
              <p className=" tracking-tight font-thin text-sm">
                Total Stocks
              </p>
            </div>
          </div>
        </div>
        {/* total staff */}
        <div className="w-[20%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className="my-[40px]  flex gap-3 justify-between ">
            <div
              className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
            >
              <GiIdCard
                className={`w-full h-full border text-[#8AB4F8] border-solid border-[#8AB4F8] bg-[#434446] rounded-full p-2`}
                alt=""
              />
            </div>
            <div className=" self-end">
              <p className=" text-2xl font-extrabold tracking-wide"> {dbData?.data?.total_staff}</p>
              <p className=" tracking-tight font-thin text-sm">Total Staff</p>
            </div>
          </div>
        </div>
        {/* Quick action */}
        <div className="w-[60%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className=" ">
            <h2 className=" mb-2 tracking-wide text-[1.2rem]">Quick Actions</h2>
            <div className="  flex items-center justify-center mb-3">
              <div className="me-4 w-[40%] border border-[#3f4245] py-2 px-3 rounded-md">
                <div className=" my-1 flex items-center justify-evenly ">
               <Link to={'adding-product'}>
               <div className="hover:opacity-60 me-4 border border-[#3f4245] py-2 px-3 rounded-md ">
                    <AiOutlinePlus
                      className={`w-full h-full text-3xl text-[#8AB4F8]   p-2`}
                    />
                  </div>
               </Link>
                  <div>
                    <p className=" text-lg font-extrabold ">Add Product</p>
                    <p className=" tracking-tight font-thin text-sm">
                     Stock Update
                    </p>
                  </div>
                </div>
              </div>
              <div className="me-4 w-[60%] border border-[#3f4245] py-2 px-3 rounded-md">
                <div className="flex items-center justify-between ">
                  <div className=" my-1  flex items-center justify-evenly">
                    <div className=" me-4 border border-[#3f4245] py-2 px-3 rounded-md ">
                      <BsShop
                        className={`w-full h-full text-3xl text-[#8AB4F8]   p-2`}
                      />
                    </div>
                    <div>
                      <p className=" text-lg font-extrabold ">Go to Shop</p>
                      <p className=" tracking-tight font-thin text-sm">
                       Complete the sale
                      </p>
                    </div>
                  </div>
                 <Link to={'sale-recent'}>
                 <div className=" hover:opacity-60 me-4  py-2 px-3 rounded-md ">
                    <AiOutlineArrowRight
                      className={`w-full h-full border text-[#8AB4F8] border-solid border-[#8AB4F8] bg-[#434446] rounded-full p-2`}
                    />
                  </div>
                 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second row */}
      <div className=" my-5 border me-4 border-[#3f4245] rounded-md">
        <div className=" ms-10 flex ">
          {/* chart section */}
          <div className=" w-[70%]">
            <div className=" flex  justify-between my-2">
              <h2 className=" tracking-wide text-[1.5rem] capitalize">{dataType} Sales</h2>
              <div className="flex border border-[#3f4245] rounded-md">
         <button
           className={`border-r rounded-l-md  border-[#3f4245] w-[5rem] py-2 ${
             dataType === "yearly" ? "bg-gray-500" : ""
           }`}
           onClick={() => handleTypeChange("yearly")}
         >
           <span className="text-center text-md text-[#f5f5f5]">Yearly</span>
         </button>
         <button
           className={`border-r  border-[#3f4245] w-[5rem] py-2 ${
             dataType === "monthly" ? "bg-gray-500" : ""
           }`}
           onClick={() => handleTypeChange("monthly")}
         >
           <span className="text-center text-md text-[#f5f5f5]">Monthly</span>
         </button>
         <button
           className={`border-r rounded-r-md border-[#3f4245] w-[5rem] py-2 ${
             dataType === "weekly" ? "bg-gray-500" : ""
           }`}
           onClick={() => handleTypeChange("weekly")}
         >
           <span className="text-center text-md text-[#f5f5f5]">Weekly</span>
         </button>
       </div>
            </div>
            {dbData?.data?.sale_records.length !== 0 ? (<div>
              <Line data={data} options={options} height={80} />
            </div>) : (<h1 className=" text-end me-32 my-20">There is no data</h1>)}
          </div>
          {/* info section */}
          <div className="w-[30%] mx-5">
            {dbData?.data?.sale_records.length!==0 ? (
            <>
            <div className="">
              <div className=" mt-3">
                <p className=" text-[1.2rem]  font-thin tracking-wide">
                  982.85k
                </p>
                <p className=" tracking-tight font-thin text-sm">Kyats</p>
              </div>
              <div className=" my-1">
                <div className=" flex gap-3 items-center justify-between mb-2 ">
                  <div className="bg-[#434446] rounded-lg px-3 py-2">
                    <BsGraphUpArrow className=" text-[#07f51b] text-xl font-extrabold  " />
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-lg font-thin  tracking-wide">
                      {" "}
                  {dbData?.data?.stats?.total_profit.toLocaleString()}
                    </span>
                    <span className="tracking-tight w-96 font-thin text-sm  text-[#7e7f80]">
                      {" "}
                      Total Profit
                    </span>
                  </div>
                </div>
                <div className=" flex  gap-3  items-center justify-between mb-2 ">
                  <div className="bg-[#434446] rounded-lg px-3 py-2">
                    <PiCoinsDuotone className=" text-[#8AB4F8] text-xl font-extrabold  " />
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-lg font-thin  tracking-wide">
                      {" "}
                      {dbData?.data?.stats?.total_income.toLocaleString()}
                    </span>
                    <span className="tracking-tight w-96 font-thin text-sm  text-[#7e7f80]">
                      Total Income
                    </span>
                  </div>
                </div>
                <div className=" flex  gap-3  items-center justify-between mb-2">
                  <div className="bg-[#434446] rounded-lg px-3 py-2">
                    <GiPayMoney className="   text-amber-400 text-xl font-extrabold  " />
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-lg font-thin  tracking-wide">
                    {dbData?.data?.stats?.total_expense.toLocaleString()}
                    </span>
                    <span className="tracking-tight w-96 font-thin text-sm  text-[#7e7f80]">
                      Total Expense
                    </span>
                  </div>
                </div>
              </div>
            </div>
          
              <button className="py-1 text-[#161618] px-2 w-full font-semibold text-md rounded-md bg-[#8AB4F8]">
                SALE REPORT
              </button>
            </>) :(<></>)}
        
          </div>
        </div>
      </div>
      {/* Third row */}
      <div>
        <div className="py-5 pb-3 ">
         <Recent/>
        </div>

    
        {/* total and tax */}
        <div className="flex justify-between ">
          {/* {oldData ? (
          <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Vouchers
              </span>
              <span className="text-md self-end">{totals?.total_voucher}</span>
            </button>
            <button className="border-r border-[#3f4245]  flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Cash
              </span>
              <span className="text-md self-end">
                {totals?.total_cash.toFixed(2)}
              </span>
            </button>
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Tax
              </span>
              <span className="text-md self-end">
                {totals?.total_tax.toFixed(2)}
              </span>
            </button>
            <button className="  flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">Total </span>
              <span className="text-md self-end">
                {totals?.total.toFixed(2)}
              </span>
            </button>
          </div>
        ) : (
          <Loader variant="dots" color="gray" />
        )} */}
          <div className=" py-5 place-self-end">
            {/* <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            last_page={recordedVoucher?.currentData?.meta?.last_page}
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
