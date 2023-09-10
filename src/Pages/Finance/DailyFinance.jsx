import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import DropDownBtn from "../../Components/DropDownBtn";
import { AiOutlineArrowRight } from "react-icons/ai";
import DatePickers from "../../Components/Pickers/DatePickers";
import Pagination from "../../Components/Pagination";
import Cookies from "js-cookie";
import { useGetDailyFinanceInfoQuery } from "../../Feature/API/FinanceApi";

const DailyFinance = () => {
  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string if the date is not set
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState(todayDate);
  console.log(selectedDate);
  const token = Cookies.get("token");
  const formattedDate = formatDate(selectedDate);

  const [currentPage, setCurrentPage] = useState(1);

  const getDailyData = useGetDailyFinanceInfoQuery({
    token,
    currentPage,
    date: formattedDate,
  });
  console.log(getDailyData);

  const totals = getDailyData?.currentData?.total;
  const lastPage = getDailyData?.currentData?.meta?.last_page;

  const getAllDailyData = getDailyData?.data?.data;
  console.log(getAllDailyData);

  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
          showBtn={true}
          icon={false}
          btnText={"Go to Shop"}
          title={"Daily"}
          firstRoute={"Finance"}
          secondRoute={"Daily"}
        />
      </div>
      {/* path breadcrumbs */}

      <div className="py-5 pb-3 ">
        <div className=" flex justify-between">
          <h2 className=" tracking-wide text-[1.5rem]">
            {selectedDate !== null
              ? `${formattedDate} Sales Overview`
              : `Today Sales Overview`}
          </h2>
          <div className="flex gap-3">
            <DropDownBtn />
            {/* <button className="text-white border border-[#7E7F80]  font-medium rounded-lg text-sm px-5 text-center inline-flex items-center ">
              <PiCalculatorDuotone className="text-[#8AB4F8] h-5 w-5 me-2" />
              ntntn
            </button> */}
            <DatePickers
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </div>

      <main className="border border-[#3f4245] rounded-sm mt-7">
        <table className="w-full text-sm text-center text-[#f5f5f5]">
          <thead className="text-xs text-[#f5f5f5] uppercase ">
            <tr className="border-b border-[#3f4245]">
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Vouchers</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Item Count</th>

              <th className="px-6 py-4">Cash</th>
              <th className="px-6 py-4">Tax</th>
              <th className="px-6 py-4">Total</th>
            </tr>
          </thead>
          {/* map data from from api */}
          {getAllDailyData && getAllDailyData.length === 0 ? (
            <tbody className="text-[#f5f5f5]">
              <tr className="border-b border-[#3f4245]">
                <td className="py-4" colSpan="7">
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="text-[#f5f5f5]">
              {getAllDailyData?.map((dailyData, index) => {
                return (
                  <tr key={index} className="border-b border-[#3f4245]">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{dailyData?.voucher_number}</td>
                    <td className="px-6 py-4">{dailyData?.time}</td>
                    <td className="px-6 py-4">{dailyData?.item_count}</td>
                    <td className="px-6 py-4">{dailyData?.total.toFixed(2)}</td>
                    <td className="px-6 py-4">{dailyData?.tax.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {dailyData?.net_total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-2 py-2 bg-[#3f4245] rounded-full">
                        <AiOutlineArrowRight />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </main>

      {/* total and tax */}
      {getAllDailyData && getAllDailyData.length === 0 ? (
        ""
      ) : (
        <div className="flex justify-between ">
          <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Vouchers
              </span>
              <span className="text-lg self-end">{totals?.total_voucher}</span>
            </button>
            <button className="border-r border-[#3f4245]  flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Cash
              </span>
              <span className="text-lg self-end">
                {totals?.total_cash.toFixed(2)}
              </span>
            </button>
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Tax
              </span>
              <span className="text-lg self-end">
                {totals?.total_tax.toFixed(2)}
              </span>
            </button>
            <button className="  flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">Total </span>
              <span className="text-lg self-end">
                {totals?.total.toFixed(2)}
              </span>
            </button>
          </div>
          <div className=" py-5 place-self-end">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              last_page={lastPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DailyFinance;
