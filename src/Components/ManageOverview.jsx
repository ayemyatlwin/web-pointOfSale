import { Input, Select } from "@mantine/core";
import React from "react";
import { FiSearch } from "react-icons/fi";

const ManageOverview = ({ tableType }) => {
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
      </div>
    </div>
  );
};

export default ManageOverview;
