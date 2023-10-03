import React from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import VertiChart from "../../Components/Report/VertiChart";
import DonutChart from "../../Components/Report/DonutChart";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useGetWeeklySaleReportQuery } from "../../Feature/API/reportSaleApi";
import Cookies from "js-cookie";
import TodaySaleOverview from "../../Components/Report/TodaySaleOverview";

const ReportSale = () => {
  // 2022-09-29T23:37:31.000000Z

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  };

  // function formatMoney(value) {
  //   const num = parseFloat(value);
  
  //   if (num < 1000) {
  //     // If the value is less than 1000, just round it to two decimal places and display it as is.
  //     return num.toFixed(2);
  //   } else {
  //     // If the value is greater than or equal to 1000, divide it by 1000 and add the 'K' suffix.
  //     const formattedValue = (num / 1000).toFixed(1);
  //     return `${formattedValue}K`;
  //   }
  // }
  function formatMoney(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1) + "K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1) + "B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1) + "T";
    }
  }

  const token=Cookies.get("token");
  
  const weeklyData=useGetWeeklySaleReportQuery(token);
  console.log(weeklyData);
  const averageValue=weeklyData?.data?.average;
  const minimumValue=weeklyData?.data?.min;
  const maximumValue=weeklyData?.data?.max;
  // console.log(averageValue+ "av");
  // console.log(minimumValue);
  // console.log(maximumValue);

  //for table ui in Report/Sale
  const productSaleData=weeklyData?.data?.product_sales;
  // console.log(productSaleData);
  return (
    <>
      {/* header breadcrumbs with year month week btns */}
      <div className=" flex justify-between">
        <Breadcrumb
          showBtn={false}
          icon={false}
          title={"Report"}
          firstRoute={"Report"}
          secondRoute={"Sales"}
        />
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
        </div>{" "}
      </div>
      {/* above section */}
      <div className="flex flex-row gap-5">
        {/* today Sale Overview / in Component folder/ */}
        <TodaySaleOverview />
        {/* chart and rating */}
        <div className="w-[65%] border border-[#3f4245] py-2 px-3 rounded-md">
          <div className="flex flex-col">
            <h1 className="text-xl ">Weekly Sales</h1>
            <span className="text-sm">Total 84k Sales</span>
          </div>
          <div className="flex gap-2">
            <div className="w-[55%]">
              <VertiChart />
            </div>
            <div className="w-[45%]">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between pt-2">
                  <div className="flex gap-2">
                    <span className="border border-[#3f4245] px-4 rounded-md pt-3 ">
                      T
                    </span>
                    <span className="flex flex-col">
                      <span>
                        Highest
                        <span className=" inline-flex text-[#56ca00] text-sm ">
                          <MdKeyboardArrowUp className="mt-1  " /> 25.8%
                        </span>{" "}
                      </span>
                      <span className="text-xs">{formatDate(minimumValue?.created_at)}</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{formatMoney(maximumValue?.total_net_total)}</span>
                    <span className="text-xs">kyats</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <div className="flex gap-2">
                    <button className="border border-[#3f4245] px-4 rounded-md ">
                      A
                    </button>
                    <span className="flex flex-col">
                      <span>Average</span>
                      <span>income</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{formatMoney(averageValue)}</span>
                    <span className="text-xs">kyats</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <div className="flex gap-2">
                    <span className="border border-[#3f4245] px-4 pt-2  rounded-md">
                      S
                    </span>
                    <span className="flex flex-col">
                      <span>
                        Lowest
                        <span className=" inline-flex text-[#ff4c51] text-sm">
                          <MdKeyboardArrowDown className="mt-1   " /> -3%
                        </span>
                      </span>
                      <span className="text-xs">{formatDate(maximumValue?.created_at)}</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{formatMoney(minimumValue?.total_net_total)}</span>
                    <span className="text-xs">kyats</span>
                  </div>
                </div>
                <div className=" self-end mt-2">
                  <button className="px-2 py-1 border rounded-md border-[#3f4245]">
                    See More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* below section */}
      <div className="flex flex-row gap-5 my-6">
        {/* table product sales */}
        <div className="w-[60%] ">
          <h1 className="text-xl ">Product Sales</h1>
          <div className=" border border-[#3f4245] rounded-md">
            <table className="w-full text-sm text-center text-[#f5f5f5]">
              <thead className="text-xs text-[#f5f5f5] uppercase ">
                <tr className="border-b border-[#3f4245]">
                  <th className="px-1 py-3">No.</th>
                  <th className="px-1 py-3">Name</th>
                  <th className="px-1 py-3">Brand</th>
                  <th className="px-1 py-3">Sale Price</th>
                </tr>
              </thead>
              {/* map data from from api */}
              {productSaleData?.map((data,i)=>{
                return(
                  <tbody key={i} className="text-[#f5f5f5]">
                <tr className="border-b border-[#3f4245]">
                  <td className=" py-1">{i+1}</td>
                  <td className=" py-1">{data?.product_name.slice(0,5)}</td>
                  <td className=" py-1 uppercase">{data?.brand.slice(0,4)}</td>
                  <td className=" py-1 ">{data?.sale_price}</td>

                  <td className=" py-1">
                    <button className="px-2 py-2 bg-[#3f4245] rounded-full">
                      <AiOutlineArrowRight />
                    </button>
                  </td>
                </tr>
              </tbody>
                )
              })}
            </table>
          </div>
        </div>
        {/* donut chart */}
        <div className="w-[40%] ">
          <h1 className="text-xl ">Brand Sales</h1>
          <div className=" border border-[#3f4245] rounded-md">
            <DonutChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSale;
