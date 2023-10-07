import { Input, Select } from "@mantine/core";
import React from "react";
import { FiSearch } from "react-icons/fi";

const ManageOverview = ({ tableType }) => {
  const selectStyles = {
    control: {
      color: "#F8F9FA", // Set the text color for the selected option
    },
    singleValue: {
      color: "#F8F9FA", // Set the text color for the selected value
    },
    option: {
      color: "white", // Set the text color for the options (labels)
    },
  };

  return (
    // Table name and sort filter Component
    <div className="">
      <h2 className=" my-5 tracking-wide text-[1.5rem]">{tableType}</h2>
      <div className=" my-0 flex items-center justify-between">
        <Input
          styles={() => ({
            input: {
              color: "#F8F9FA",
            },
          })}
          icon={<FiSearch />}
          variant="unstyled"
          placeholder="Search"
          radius="xs"
          className=" border border-[#3f4245] w-[400px] rounded-lg text-gray-400"
        />
        <div className=" flex  items-center gap-5  justify-around ">
          <span className=" flex mt-1  ">Sort: </span>
          <Select
            placeholder="by name"
            radius="xs"
            variant="unstyled"
            className="  "
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
            data={[
              { value: "react", label: "A to Z" },
              { value: "ng", label: "Z to A" },

            ]}
          />
        </div>
        <div className=" flex  items-center gap-5  justify-around ">
          <span className=" flex mt-1  ">Order: </span>
          <Select
            placeholder=" by Asc-Des"
            defaultValue="Last"
            radius="xs"
            variant="unstyled"
            className="" 
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
            data={[
              { value: "react", label: "Ascending" },
              { value: "ng", label: "Descending" },

            ]}
            
          />
        </div>
      </div>
    </div>
  );
};

export default ManageOverview;
