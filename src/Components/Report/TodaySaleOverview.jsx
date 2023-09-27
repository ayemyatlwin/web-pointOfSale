import React from 'react'
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { TbClipboardText } from "react-icons/tb";
import { CiMenuKebab } from "react-icons/ci";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useGetTodaySaleReportQuery } from '../../Feature/API/reportSaleApi';



const TodaySaleOverview = () => {
    const token=Cookies.get("token");
    //for today Sale UI in Report/Sale
    const {data}=useGetTodaySaleReportQuery(token);
    // console.log(data);
    const tdySaleVouchers=data?.vouchers;
  return (
    <div className="w-[35%] border border-[#3f4245] py-2 px-3 rounded-md">
          <div>
            <div className="flex justify-between">
              <h1 className="text-xl">Today Sales</h1>
              <span className="text-xs">
                <CiMenuKebab />{" "}
              </span>
            </div>
            <div className="flex flex-col pt-1">
              <h1 className="text-2xl">928,500</h1>{" "}
              <span className="text-xs pb-1">kyats </span>
            </div>
            <div className="flex flex-col">
             {tdySaleVouchers?.map((data,i)=>{
              return(
                <div key={i} className="flex flex-row justify-between pt-1 pb-2 border-t ">
                <div className="flex gap-3">
                  <span>
                    <TbClipboardText className="mt-1 text-[#8AB4F8]" />
                  </span>
                  <span>{data?.voucher_number.slice(5)}</span>
                </div>
                <div className="flex gap-3 ">
                  <span>{data?.net_total}k</span>
                  <span>{data?.percentage}</span>
                  <span>
                    <MdKeyboardArrowUp className="mt-1 text-[#56ca00]" />
                  </span>
                </div>
              </div>
              )
             })}
             
              <Link className=" self-end mt-1" to={"/sale-recent"}>
              
                <button className="px-2 py-1.5 border rounded-md border-[#3f4345]  ">
                  Recent Sales
                </button>
             
              </Link>
            </div>
          </div>
        </div>
  )
}

export default TodaySaleOverview
