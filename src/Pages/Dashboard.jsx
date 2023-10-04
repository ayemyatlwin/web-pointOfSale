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

import Cookies from "js-cookie";
import { useGetDashboardDataQuery } from "../Feature/API/dbApi";

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
  const token = Cookies.get("token");
const dbData=useGetDashboardDataQuery({token});
console.log(dbData);


// const years = dbData?.data?.sale_records.filter((e) => e.created_at.split("-")[0]);
 
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

  const labels = [

    
  ];

  const data = {
    labels,
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
                  <div className=" me-4 border border-[#3f4245] py-2 px-3 rounded-md ">
                    <AiOutlinePlus
                      className={`w-full h-full text-3xl text-[#8AB4F8]   p-2`}
                    />
                  </div>
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
                  <div className=" me-4  py-2 px-3 rounded-md ">
                    <AiOutlineArrowRight
                      className={`w-full h-full border text-[#8AB4F8] border-solid border-[#8AB4F8] bg-[#434446] rounded-full p-2`}
                    />
                  </div>
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
            <div className=" flex  justify-between my-5">
              <h2 className=" tracking-wide text-[1.5rem]">Monthly Sales</h2>
              <div className="flex gap-3 border me-3 border-[#3f4245] rounded-md">
                <button className="border-r border-[#3f4245]  w-[5rem] py-1  ">
                  <Link className=" text-center text-md text-[#f5f5f5] ">
                    Year
                  </Link>
                </button>
                <button className="border-r border-[#3f4245]   w-[5rem] py-1  ">
                  <Link className=" text-center text-md text-[#f5f5f5] ">
                    Month
                  </Link>
                </button>
                <button className="border-r border-[#3f4245]  w-[5rem] py-1 ">
                  <Link className=" text-center text-md text-[#f5f5f5] ">
                    Week
                  </Link>
                </button>
              </div>
            </div>
            <div>
              <Line data={data} options={options} height={80} />
            </div>
          </div>
          {/* info section */}
          <div className="w-[30%] mx-5">
            <div className=" w-[50%]">
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
            <div className=" mb-3">
              <button className="py-1 text-[#161618] px-2 w-full font-semibold text-md rounded-md bg-[#8AB4F8]">
                SALE REPORT
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Third row */}
      <div>
        <div className="py-5 pb-3 ">
          <div className=" flex justify-between">
            <h2 className=" tracking-wide text-[1.5rem]">
              Today Sales Overview
            </h2>
            <div className="flex gap-3">
              <DropDownBtn />
              <button
                // onClick={() => saleCloseHandler()}
                className="text-white border border-[#7E7F80]  font-medium rounded-lg text-sm px-5 text-center inline-flex items-center "
              >
                <PiCalculatorDuotone className="text-[#8AB4F8] h-5 w-5 me-2" />
                {/* {saleClose ? `Sale Close` : `Sale Open`} */}
              </button>
            </div>
          </div>
        </div>

        <main className="border border-[#3f4245] rounded-sm mt-7">
          <table className="w-full text-sm text-center text-[#f5f5f5]">
            <thead className="text-xs text-[#f5f5f5] uppercase ">
              <tr className="border-b border-[#3f4245]">
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Sale Person</th>
                <th className="px-6 py-4">Voucher No.</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Item Count</th>
                <th className="px-6 py-4">Cash</th>
                <th className="px-6 py-4">Tax</th>
                <th className="px-6 py-4"> Total</th>
              </tr>
            </thead>
            {/* map data from old recorded voucher list from api */}
            {/* <tbody className="text-[#f5f5f5]">
            {oldData?.map((data, i) => {
              return (
                <tr key={i} className="border-b border-[#3f4245]">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{data?.user}</td>
                  <td className="px-6 py-4">{data?.voucher_number}</td>
                  <td className="px-6 py-4">{data?.time}</td>
                  <td className="px-6 py-4">
                    {data?.voucher_records?.quantity}
                  </td>
                  <td className="px-6 py-4">{data?.total}</td>
                  <td className="px-6 py-4">{data?.tax}</td>
                  <td className="px-6 py-4">{data?.net_total}</td>
                  <td className="px-6 py-4">
                    <button className="px-2 py-2 bg-[#3f4245] rounded-full">
                      <AiOutlineArrowRight />
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody> */}
          </table>
        </main>

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
