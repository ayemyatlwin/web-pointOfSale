import React from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import VertiChart from "../../Components/Report/VertiChart";
import DonutChart from "../../Components/Report/DonutChart";
import { TbClipboardText } from "react-icons/tb";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const ReportSale = () => {
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
        {/* today Sale */}
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
              <div className="flex flex-row justify-between pt-1 pb-2 border-t ">
                <div className="flex gap-3">
                  <span>
                    <TbClipboardText className="mt-1 text-[#8AB4F8]" />
                  </span>
                  <span>03098</span>
                </div>
                <div className="flex gap-3 ">
                  <span>45k</span>
                  <span>455%</span>
                  <span>
                    <MdKeyboardArrowUp className="mt-1 text-[#56ca00]" />
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between border-t pt-1 pb-2">
                <div className="flex gap-3">
                  <span>
                    <TbClipboardText className="mt-1 text-[#8AB4F8]" />
                  </span>
                  <span>09037</span>
                </div>
                <div className="flex gap-3 ">
                  <span>45k</span>
                  <span>455%</span>
                  <span>
                    <MdKeyboardArrowUp className="mt-1 text-[#56ca00] " />
                  </span>
                </div>
              </div>{" "}
              <div className="flex flex-row justify-between pt-1 pb-2 border-t">
                <div className="flex gap-3">
                  <span>
                    <TbClipboardText className="mt-1 text-[#8AB4F8]" />
                  </span>
                  <span>03096</span>
                </div>
                <div className="flex gap-3 ">
                  <span>45k</span>
                  <span>455%</span>
                  <span>
                    <MdKeyboardArrowUp className="mt-1 text-[#56ca00] " />
                  </span>
                </div>
              </div>
              <div className=" self-end mt-1">
                <button className="px-2 py-1.5 border rounded-md border-[#3f4345]  ">
                  Recent Sales
                </button>
              </div>
            </div>
          </div>
        </div>
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
                    <span className="border border-[#3f4245] px-5 rounded-md pt-3 ">
                      T
                    </span>
                    <span className="flex flex-col">
                      <span>
                        Highest
                        <span className=" inline-flex text-[#56ca00] ">
                          <MdKeyboardArrowUp className="mt-1 " /> 25.8%
                        </span>{" "}
                      </span>
                      <span className="text-xs">12/8/2023</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>125k</span>
                    <span className="text-xs">kyats</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <div className="flex gap-2">
                    <button className="border border-[#3f4245] px-5  rounded-md">
                      A
                    </button>
                    <span className="flex flex-col">
                      <span>Average</span>
                      <span>income</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>100k</span>
                    <span className="text-xs">kyats</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <div className="flex gap-2">
                    <span className="border border-[#3f4245] px-5 pt-3  rounded-md">
                      S
                    </span>
                    <span className="flex flex-col">
                      <span>
                        Lowest
                        <span className=" inline-flex text-[#ff4c51]">
                          <MdKeyboardArrowDown className="mt-1  " /> -3%
                        </span>
                      </span>
                      <span className="text-xs">12/8/2023</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>97k</span>
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
      <div className="flex flex-row gap-5 mt-6">
        {/* table product sales */}
        <div className="w-[65%] ">
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
              <tbody className="text-[#f5f5f5]">
                <tr className="border-b border-[#3f4245]">
                  <td className="px-1 py-1">1</td>
                  <td className="px-1 py-1">Watermelon</td>
                  <td className="px-1 py-1 uppercase">Melon</td>
                  <td className="px-1 py-1 ">100,000</td>

                  <td className=" py-1">
                    <button className="px-2 py-2 bg-[#3f4245] rounded-full">
                      <AiOutlineArrowRight />
                    </button>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* donut chart */}
        <div className="w-[35%] ">
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
