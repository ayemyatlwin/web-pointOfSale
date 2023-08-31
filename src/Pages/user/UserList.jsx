import React, { useState } from "react";
import { Table } from "@mantine/core";
import { BsArrowRight, BsDash } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import Breadcrumb from "../../Components/Breadcrumb";
import Pagination from "../../Components/Pagination";
import Cookies from "js-cookie";
import { useGetAllUsersQuery } from "../../Feature/API/userApi";
import { useNavigate } from "react-router-dom";
import ManageOverview from "../../Components/ManageOverview";
import { TableCell, TableHead, TableRow } from "@mui/material";

export default function UserList() {
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetAllUsersQuery({ token, currentPage });
  const users = data?.users.data;
  console.log(data);

 

  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
           showBtn={true} createUser={true}
          icon={true}
          btnText={"Create user"}
          title={"User"}
          firstRoute={"User"}
          secondRoute={"Overview"}
        />
      </div>
      {/* path breadcrumbs */}
      <div>
        <ManageOverview tableType={"Staff Overview"} />
      </div>
      <main className="border border-[#3f4245] rounded-sm mt-7">
        <table className="w-full text-sm text-center text-[#f5f5f5]">
          <thead className="text-xs text-[#f5f5f5] uppercase"
          >
            <tr className="border-b border-[#3f4245]">
              <th className="px-6 py-4" >No.</th>
              <th className="px-6 py-4" >Name</th>
              <th className="px-6 py-4" >Position</th>
              <th className="px-6 py-4" >Email</th>
              <th className="px-6 py-4" ></th>
            </tr>
          </thead>
          <tbody className="text-[#f5f5f5]">
            {users?.map((i,index)=>{
              return(
                <tr key={i.id} className="border-b border-[#3f4245]">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{i.name}</td>
                <td className="px-6 py-3">{i.role}</td>
                <td className="px-6 py-3">{i.email}</td>
                <td  className="flex gap-5 px-6 py-3">
                  <BsDash className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
                  <MdOutlineEdit
                    onClick={() => nav(`/edit-user/${i.id}`)}
                    className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in"
                  />
                  <BsArrowRight
                    onClick={() => nav(`/user-detail/${i.id}`)}
                    className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in"
                  />
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </main>
      <div>

      <div className="flex justify-end my-3 ">
        
        <div className=" py-5">Pagination</div>
      </div>
        {/* <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          last_page={data?.users.to}
        /> */}
      </div>
    </>
  );
}
