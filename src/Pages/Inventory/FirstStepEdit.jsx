import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  addProductMore_information,
  addProductName,
  addProductUnit,
} from "../../Feature/Service/productSlice";

const FirstStepEdit = ({
  toggleSelect,
  display,
  setDisplay,
  select,
  editData,
}) => {
  const dispatch = useDispatch();
  const [addName, setAddName] = useState(editData.name);
  const [addUnit, setAddUnit] = useState(editData.unit);
  const [moreInfo, setMoreInfo] = useState(editData.more_information);

  useEffect(() => {
    dispatch(addProductName({ name: addName }));
    dispatch(addProductUnit({ unit: addUnit }));
    dispatch(addProductMore_information({ more_information: moreInfo }));
  }, [ addName,addUnit,moreInfo]);
  return (
    <div>
      <section className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}>
        <div className="flex">
          <label className="w-[30%]">Name</label>
          <input
          value={addName}
            onChange={(e) => setAddName(e.target.value)}
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            
          />
        </div>
        <div className={`flex`}>
          <label className="block mb-2 w-[30%]" htmlFor="">
            Brand
          </label>
          <div
            onClick={toggleSelect}
            className="w-[70%] border outline-none py-2.5 relative rounded cursor-pointer"
          >
            <div className="px-5 flex items-center justify-between">
              <p className="">{display}</p>
              <BiChevronDown
                className={`text-xl ${
                  select && "rotate-180"
                } transition-all duration-150`}
              />
            </div>
            <div
              className={`${
                select ? "scale-y-1" : "scale-y-0"
              } transition-all duration-150 origin-top z-40 border rounded absolute w-full top-14`}
            >
              <div
                onClick={(e) => {
                  setDisplay(e.target.textContent);
                }}
                className="w-full outline-none py-3 bg-[#202124] px-5 rounded-t border-b cursor-pointer"
              >
                LV
              </div>
              <div
                onClick={(e) => {
                  setDisplay(e.target.textContent);
                }}
                className="w-full outline-none py-3 bg-[#202124] px-5 rounded-b cursor-pointer"
              >
                Gucci
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <label className="w-[30%]">Unit</label>
          <input
            value={addUnit}
            onChange={(e) => setAddUnit(e.target.value)}
            placeholder="Enter unit"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="number"
            
          />
        </div>
        <div className="flex">
          <label className="w-[30%]">More info</label>
          <textarea
            value={moreInfo}
            onChange={(e) => setMoreInfo(e.target.value)}
            rows={3}
            placeholder="Enter more info about the product"
            className={`w-[70%] bg-[#202124] outline-none border rounded px-5 py-2`}
            type="phone"
            name=""
            id=""
          />
        </div>
      </section>
    </div>
  );
};

export default FirstStepEdit;
