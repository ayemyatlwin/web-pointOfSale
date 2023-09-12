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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
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
          <div className=" my-[58px] flex items-center justify-around">
            <div
              className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
            >
              <AiOutlineShoppingCart
                className={`w-full h-full border text-blue-500 border-solid border-blue-500 bg-[#434446] rounded-full p-2`}
                alt=""
              />
            </div>
            <div>
              <p className=" text-2xl font-extrabold tracking-wide">28,500k</p>
              <p className=" tracking-tight font-thin text-sm">
                Total Products
              </p>
            </div>
          </div>
        </div>
        {/* total staff */}
        <div className="w-[20%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className="my-[58px]  flex items-center justify-around">
            <div
              className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
            >
              <GiIdCard
                className={`w-full h-full border text-blue-500 border-solid border-blue-500 bg-[#434446] rounded-full p-2`}
                alt=""
              />
            </div>
            <div>
              <p className=" text-2xl font-extrabold tracking-wide">645</p>
              <p className=" tracking-tight font-thin text-sm">Total Staff</p>
            </div>
          </div>
        </div>
        {/* Quick action */}
        <div className="w-[60%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className="my-4 ">
            <p className=" my-4 block text-2xl font-extrabold tracking-wide">
              Quick Actions
            </p>
            <div className="  flex items-center justify-center">
              <div className="me-4 w-[40%] border border-[#3f4245] py-2 px-3 rounded-md">
                <div className=" my-2 flex items-center justify-evenly ">
                  <div className=" me-4 border border-[#3f4245] py-2 px-3 rounded-md ">
                    <AiOutlinePlus
                      className={`w-full h-full text-3xl text-blue-500   p-2`}
                    />
                  </div>
                  <div>
                    <p className=" text-lg font-extrabold ">28,500k</p>
                    <p className=" tracking-tight font-thin text-sm">
                      Total Products
                    </p>
                  </div>
                </div>
              </div>
              <div className="me-4 w-[60%] border border-[#3f4245] py-2 px-3 rounded-md">
                <div className="flex items-center justify-between ">
                  <div className=" my-2  flex items-center justify-evenly">
                    <div className=" me-4 border border-[#3f4245] py-2 px-3 rounded-md ">
                      <BsShop
                        className={`w-full h-full text-3xl text-blue-500   p-2`}
                      />
                    </div>
                    <div>
                      <p className=" text-lg font-extrabold ">28,500k</p>
                      <p className=" tracking-tight font-thin text-sm">
                        Total Products
                      </p>
                    </div>
                  </div>
                  <div className=" me-4  py-2 px-3 rounded-md ">
                    <AiOutlineArrowRight
                      className={`w-full h-full border text-blue-500 border-solid border-blue-500 bg-[#434446] rounded-full p-2`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second row */}
      <div className=" my-8 border me-4 border-[#3f4245] rounded-md">
        <div className=" my-16 ms-10 flex items-center">
          {/* chart section */}
          <div className=" w-[70%]">
            <div className=" flex items-center justify-between">
              <p className="text-3xl  tracking-wide">Monthly Sales</p>
              <div>
                <button className=" border border-[#3f4245] rounded-md px-3 py-2  hover:text-blue-500 hover:opacity-70 hover:backdrop-blur-sm ">
                  Year
                </button>
                <button className=" border border-[#3f4245] rounded-md px-3 py-2  hover:text-blue-500 hover:opacity-70 hover:backdrop-blur-sm ">
                  Month
                </button>
                <button className=" border border-[#3f4245] rounded-md px-3 py-2  hover:text-blue-500 hover:opacity-70 hover:backdrop-blur-sm ">
                  {" "}
                  Week
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
              <div className=" my-8">
                <p className=" text-2xl  font-thin tracking-wide">982.85k</p>
                <p className=" tracking-tight font-thin text-sm">Kyats</p>
              </div>
              <div className=" my-4">
                <div className=" flex items-center justify-between my-6">
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
                <div className=" flex items-center justify-between  my-6">
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
                <div className=" flex items-center justify-between  my-6">
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
            <div className=" my-4">
              <button className=" px-20  py-3 rounded-md bg-blue-500">
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
          <h2 className=" tracking-wide text-[1.5rem]">Today Sales Overview</h2>
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
