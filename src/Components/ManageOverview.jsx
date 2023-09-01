import { Typography } from "@mui/material";
import React from "react";

const ManageOverview = ({tableType}) => {
  return (
    // Table name and sort filter Component
    <div className="py-2 mt-2 mb-1">
      <h2 className="tracking-wide text-[1.5rem] pb-3" >
        {tableType}
      </h2>
      <div className="flex justify-between">
        <input
          id="exampleSearch2"
          placeholder="search"
          className=" w-44 px-3 py-1 rounded border border-[#3f4245] bg-transparent bg-clip-padding text-base font-normal leading-[1.6] text-[#f5f5f5] outline-none transition duration-200 ease-in-out  "
          type="search"
        />
        <div className="flex self-baseline gap-5">
          <span className="text-gray-500">
            Sort : 
            <select data-te-select-init className="bg-inherit text-[#f5f5f5] outline-none focus:bg-inherit">
              <option className="bg-gray-400" value="1">Last</option>
              <option className="bg-gray-400" value="2">First</option>
             
            </select>
          </span>
          <span className="text-gray-500">
            Filter :
            <select data-te-select-init className="bg-inherit text-[#f5f5f5] outline-none focus:bg-inherit">
              <option className="bg-gray-400 " value="1">All Files</option>
              <option className="bg-gray-400" value="2">Recent</option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManageOverview;
