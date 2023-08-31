import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import ManageOverview from "../../Components/ManageOverview";
import { Table } from "@mantine/core";
import Pagination from "../../Components/Pagination";
import { useRecordedVoucherQuery } from "../../Feature/API/saleApi";
import Cookies from "js-cookie";

const Recent = () => {
  const token = Cookies.get("token");

  const recordedVoucher = useRecordedVoucherQuery(token);
  console.log(recordedVoucher?.currentData?.data);
  const oldData = recordedVoucher?.currentData?.data;

  const [currentPage, setCurrentPage] = useState(1);

  const totals = oldData?.map((eachData) => eachData?.net_total);
  console.log(totals);


  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
        showBtn={true}
          icon={false}
          btnText={"Go to Shop"}
          title={"Recent"}
          firstRoute={"Sale"}
          secondRoute={"Recent"}
        />
      </div>
      {/* path breadcrumbs */}

      {/* sort filter tablename component */}
      <ManageOverview tableType={"Sale Overview"} />
      {/* sort filter tablename component */}

      <main className="border border-[#3f4245] rounded-sm mt-7">
        <table className="w-full text-sm text-center text-[#f5f5f5]" >
          <thead className="text-xs text-[#f5f5f5] uppercase ">
            <tr className="border-b border-[#3f4245]">
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Voucher No.</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Item Count</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Tax</th>
              <th className="px-6 py-4">Net Total</th>
              <th className="px-6 py-4">User</th>
            </tr>
          </thead>
          {/* map data from old recorded voucher list from api */}
          <tbody className="text-[#f5f5f5]">
            {oldData?.map((data, i) => {
              return (
                <tr key={i} className="border-b border-[#3f4245]">
                  <td className="px-6 py-4">{i +1}</td>
                  <td className="px-6 py-4">{data?.voucher_number}</td>
                  <td className="px-6 py-4">{i+1}</td>
                  <td className="px-6 py-4">{data.voucher_records.quantity}</td>
                  <td className="px-6 py-4">{data.total}</td>
                  <td className="px-6 py-4">{data.tax}</td>
                  <td className="px-6 py-4">{data.net_total}</td>
                  <td className="px-6 py-4">{data?.user}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        
      </main>
      
      {/* total and tax */}
      <div className="flex justify-between ">
        <p className="flex gap-3 py-5">
          <span>Total sale: </span>
          <span>{totals?.reduce((pv, cv) => pv + cv, 0).toFixed(2)} MMK</span>
        </p>
        <div className=" py-5">Pagination</div>
      </div>
    </>
  );
};

export default Recent;
