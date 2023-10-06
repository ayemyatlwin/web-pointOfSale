import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import {
  Input,
  NumberInput,
  Select,
  Table,
  TextInput,
  Textarea,
} from "@mantine/core";
import { FiSearch } from "react-icons/fi";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, useMantineTheme } from "@mantine/core";
import {
  AiOutlineOrderedList,
  AiFillEdit,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiCopyDuotone } from "react-icons/pi";
import {
  IoMdAdd,
  IoMdAddCircleOutline,
  IoMdRemoveCircle,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  useAddingStockQuantityMutation,
  useDeleteProductsMutation,
  useGetProductInfoQuery,
} from "../../Feature/API/productApi";
import Cookies from "js-cookie";
import Pagination from "../../Components/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const StockControl = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const nav = useNavigate();
  const token = Cookies.get("token");
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetProductInfoQuery({ token, currentPage });
  const productDetailedInfo = data?.data;
  console.log(productDetailedInfo);
const[quantity,setQuantity]=useState('');
const[more_information,setMore_Information]=useState('');
  const theme = useMantineTheme();
  const [displayState, setDisplayState] = useState(false);
  const [displayState2, setDisplayState2] = useState(false);
  const creatingProductdata=(product_id,quantity,more_information)=>{
console.log(product_id);
console.log(quantity);
console.log(more_information);
  }

  const rows = productDetailedInfo?.map((element, i) => (
 
    <tr key={element.product_id} className="border-b border-[#3f4245]">
      <td className="px-6 py-4">{i + 1}</td>
      <td className="px-6 py-4">{element.name}</td>
      <td className="px-6 py-4">{element.brand_name}</td>
      <td className="px-6 py-4">{element.unit}</td>
      <td className="px-6 py-4">{element.total_stock}</td>
 

      <td className=" text-white">
   
        <div className="  ms-4 flex  ">
      
          <Group position="center">
            <Button   onClick={()=>nav(`/stock-adding/${element.product_id}`)}>
              <IoMdAddCircleOutline  className=" cursor-pointer hover:text-blue-700" />
            </Button>
          </Group>
          
          
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className=" flex justify-between items-center">
        <Breadcrumb
          showBtn={false}
          title={"Stock Control"}
          firstRoute={"Inventory"}
          secondRoute={"Stock Control"}
        />
   
      </div>
      <div>
      <h2 className=" my-5 tracking-wide text-[1.5rem]">Today Sales Overview</h2>
      <div className="flex items-center justify-between">
        <Input
          styles={() => ({
            input: {
              color: '#F8F9FA',
            },
          })}
          icon={<FiSearch />}
          variant="unstyled"
          placeholder="Search"
          radius="xs"
          className=" border border-gray-400 w-[400px] rounded-xl text-gray-400"
        />
        <div className=" flex  items-center gap-5  justify-around ">
          <span className=" flex mt-1  ">Sort: </span>
          <Select
            placeholder="Pick one"
            defaultValue="Last"
            radius="xs"
            variant="unstyled"
            className="  "
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
            data={[
              { value: "react", label: "Last" },
              { value: "ng", label: "First" },

              ,
            ]}
          />
        </div>
        <div className=" flex  items-center gap-5  justify-around ">
          <span className=" flex mt-1  ">Sort: </span>
          <Select
            placeholder="Pick one"
            defaultValue="Last"
            radius="xs"
            variant="unstyled"
            className="  "
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
            data={[
              { value: "react", label: "Last" },
              { value: "ng", label: "First" },

              ,
            ]}
          />
        </div>
          <div className="">
            <AiOutlineOrderedList
              onClick={() => setDisplayState(false) && setDisplayState2(true)}
              className={`${displayState ? "text-blue-800" : "text-gray-300"} ${
                displayState ? "border-blue-800" : "border-gray-300"
              } hover:text-blue-800 hover:border-blue-800 text-gray-300 border cursor-pointer border-solid border-gray-300 mx-2 inline`}
            />
            <BsFillGridFill
              onClick={() => setDisplayState(true) && setDisplayState2(false)}
              className={`${
                !displayState ? "text-blue-800" : "text-gray-300"
              } ${
                !displayState ? "border-blue-800" : "border-gray-300"
              } hover:text-blue-800 hover:border-blue-800 text-gray-300  cursor-pointer border border-solid border-gray-300 inline`}
            />
          </div>
        </div>
        <div
          className={`${!displayState ? "block" : "hidden"} overflow-y-auto`}
        >
          <main className="border border-[#3f4245] rounded-sm mt-7 ">
            <table className="w-full text-sm text-center text-[#f5f5f5]">
              <thead className="text-xs text-[#f5f5f5] uppercase ">
                <tr className="border-b border-[#3f4245]">
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              {/* map data from old recorded voucher list from api */}
              <tbody className="text-[#f5f5f5]">{rows}</tbody>
            </table>
          </main>

          <div className=" my-8">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              last_page={data?.meta.to}
            />
          </div>
        </div>
        <div
          className={`${
            displayState ? "flex" : "hidden"
          }   my-6 overflow-y-auto  flex-wrap  justify-center gap-10 items-center`}
        >
          {productDetailedInfo?.map((i) => {
            return (
              <div key={i.product_id} className=" w-[250px]  bg-white border overflow-hidden  border-[#3f4245] rounded-lg shadow ">
                <img
                  src={i.photo}
                  className=" w-[250px] object-fill h-40 "
                  alt=""
                />
                <div className="p-2 bg-[#161618] ">
                  <p className="mb-1  text-lg text-right font-medium tracking-wide text-[#E8EAED] ">
                    {i.name}
                  </p>
                  <p className="mb-1 text-right text-md text-[#E8EAED] font-normal  ">
                    {i.sale_price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StockControl;
