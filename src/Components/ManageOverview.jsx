import { Input, Select } from "@mantine/core";
import { Typography } from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";

const ManageOverview = ({tableType}) => {
  return (
    // Table name and sort filter Component
    <div className="py-2 mt-2 mb-1">
      <h2 className=" mt-12 tracking-wide text-[1.5rem]">{tableType}</h2>
        <div className=" my-0 flex items-center justify-between">
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
    </div>
    </div>
  );
};

export default ManageOverview;
