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
  IoMdRemoveCircle,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Pagination from "../../Components/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDeleteBrandMutation, useGetBrandInfoQuery } from "../../Feature/API/brandApi";

const BrandOverview = () => {

  const nav = useNavigate();
  const token = Cookies.get("token");
  const [currentPage, setCurrentPage] = useState(1);
  const {data}=useGetBrandInfoQuery({ token, currentPage })
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [displayState, setDisplayState] = useState(false);
  const [displayState2, setDisplayState2] = useState(false);
 const [deleteBrand]=useDeleteBrandMutation();
 const handleDelete = async (id, token) => {
    Swal.fire({
      title: `Are you sure you want to delete this product??`,
      icon: "question",
      iconColor: "#FF0000",
      background: "#161618",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "#24262b",
      confirmButtonText: `Delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the deleteMedia mutation with the id of the picture to delete
          const resulted = await deleteBrand({ id, token });
          console.log(resulted);

          if (resulted.error) {
            // Handle any errors here
            console.error("Error deleting media:", resulted.error);
          } else {
            // Handle success, e.g., update your component state
            toast.success("Product deleted successfuly!", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 2000,

              hideProgressBar: true,
              theme: "dark",
            });
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    });
  };

const brandDetailedInfo=data?.data;
console.log(brandDetailedInfo);
  const rows = brandDetailedInfo?.map((element, i) => (
    <tr key={element.brand_id} className="border-b border-[#3f4245]">
      <td className="px-6 py-4">{i + 1}</td>
      <td className="px-6 py-4">{element.name.slice(0,6)}..</td>
      <td className="px-6 py-4">{element.company.slice(0,6)}..</td>
      <td className="px-6 py-4">{element.agent}</td>
      <td className="px-6 py-4">{element.phone}</td>
      <td className="px-6 py-4 w-[50px]">{element.information.slice(0,6)}..</td>

      <td className=" text-white">
 
        <div className="  flex  ">
          <Group>
            <Button onClick={() => handleDelete(element?.brand_id, token)}>
              <IoMdRemoveCircleOutline className=" cursor-pointer hover:text-blue-700" />
            </Button>
          </Group>
          <Group position="center">
            <Link to={`/brand-editing/${element?.brand_id}`}>
              <Button>
                <AiFillEdit className="cursor-pointer hover:text-blue-700" />
              </Button>
            </Link>
          </Group>
          <Group position="center">
            <Link  to={`/brand-detail/${element?.brand_id}`}>
              <Button>
                <AiOutlineArrowRight className="cursor-pointer hover:text-blue-700" />
              </Button>
            </Link>
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
          title={"Manage Brands"}
          firstRoute={"Inventory"}
          secondRoute={"Manage Brands"}
        />
        <div className="  ">
         

          <button
            onClick={() => {
              nav("/brand-adding");
            }}
            className=" hover:opacity-80 px-6 py-2   font-bold  border  rounded-sm text-black bg-blue-300 "
          >
            + Add Brand
          </button>
        </div>
      </div>
      <div>
      <h2 className=" mt-12 tracking-wide text-[1.5rem]">Today Sales Overview</h2>
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
          <div className=" flex  items-center justify-around ">
            <p className=" ">Sort:</p>
            <Select
              label="Your favorite framework/library"
              placeholder="Pick one"
              defaultValue="Last"
              radius="xs"
              variant="unstyled"
              className="  w-[100px] h-[170px]  my-auto mx-6"
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
          <div className=" flex  items-center justify-evenly ">
            <p className=" ">Sort:</p>
            <Select
              label="Your favorite framework/library"
              placeholder="Pick one"
              defaultValue="Last"
              radius="xs"
              variant="unstyled"
              className="  w-[100px] h-[170px]  my-auto mx-6"
              transitionProps={{
                transition: "pop-top-left",
                duration: 80,
                timingFunction: "ease",
              }}
              data={[
                { value: "react", label: "All File" },
                { value: "ng", label: "Some File" },

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
          <main className="border border-[#3f4245] rounded-sm  ">
            <table className="w-full text-sm text-center text-[#f5f5f5]">
              <thead className="text-xs text-[#f5f5f5] uppercase ">
                <tr className="border-b border-[#3f4245]">
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4">Brand Name</th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Agent</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Description</th>
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
          }  my-6    flex-wrap justify-center gap-6 items-center`}
        >
          {brandDetailedInfo?.map((i) => {
            return (
              <div key={i.brand_id} className=" w-[250px]  bg-white border overflow-hidden  border-[#3f4245] rounded-lg shadow ">
                <img
                  src={i.photo}
                  className=" w-[250px] object-fill h-40 "
                  alt=""
                />
                <div className="p-2 bg-[#161618] ">
                  <p className="mb-1 text-right text-md text-[#E8EAED] font-normal  ">
                    {i.name.substring(0,10)}...
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

export default BrandOverview;
