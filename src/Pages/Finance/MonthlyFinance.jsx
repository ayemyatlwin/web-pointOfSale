import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import DropDownBtn from "../../Components/DropDownBtn";
import { PiCalculatorDuotone } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";
const MonthlyFinance = () => {
  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
          showBtn={true}
          icon={false}
          btnText={"Go to Shop"}
          title={"Monthly"}
          firstRoute={"Finance"}
          secondRoute={"Monthly"}
        />
      </div>
      {/* path breadcrumbs */}

      <div className="py-5 pb-3 ">
        <div className=" flex justify-between">
          <h2 className=" tracking-wide text-[1.5rem]">
            This Month Sales Overview
          </h2>
          <div className="flex gap-3">
            <DropDownBtn />
            <button className="text-white border border-[#7E7F80]  font-medium rounded-lg text-sm px-5 text-center inline-flex items-center ">
              <PiCalculatorDuotone className="text-[#8AB4F8] h-5 w-5 me-2" />
              ntntn
            </button>
          </div>
        </div>
      </div>

      <main className="border border-[#3f4245] rounded-sm mt-7">
        <table className="w-full text-sm text-center text-[#f5f5f5]">
          <thead className="text-xs text-[#f5f5f5] uppercase ">
            <tr className="border-b border-[#3f4245]">
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Vouchers</th>
              <th className="px-6 py-4">Cash</th>
              <th className="px-6 py-4">Tax</th>
              <th className="px-6 py-4">Total</th>
            </tr>
          </thead>
          {/* map data from from api */}
          <tbody className="text-[#f5f5f5]">
            <tr className="border-b border-[#3f4245]">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">
                <AiOutlineArrowRight />{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      {/* total and tax */}
      <div className="flex justify-between ">
        <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
          <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">
              Total Months
            </span>
            <span className="text-lg self-end">45675</span>
          </button>

          <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">
              Total Vouchers
            </span>
            <span className="text-lg self-end">45675</span>
          </button>
          <button className="border-r border-[#3f4245]  flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">Total Cash</span>
            <span className="text-lg self-end">45675</span>
          </button>
          <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">Total Tax</span>
            <span className="text-lg self-end">45675</span>
          </button>
          <button className="  flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">Total </span>
            <span className="text-lg self-end">45675</span>
          </button>
        </div>
        <div className=" py-5 place-self-end">Pagination</div>
      </div>
    </>
  );
};

export default MonthlyFinance;
