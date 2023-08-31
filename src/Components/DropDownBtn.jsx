import React from "react";
import {PiExportDuotone} from "react-icons/pi"
import {MdOutlineKeyboardArrowDown} from "react-icons/md"


const DropDownBtn = () => {
  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white border border-[#7E7F80]  font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center "
        type="button"
      >
        <PiExportDuotone className="text-[#8AB4F8] h-5 w-5 me-2"/>
        Export
        <MdOutlineKeyboardArrowDown className=" h-5 w-5 ms-2"/>
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
      >
        <ul
          className="py-2 text-sm text-gray-700 "
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 "
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 "
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 "
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 "
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownBtn;
