import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addProductMore_information, addProductName, addProductUnit } from '../../Feature/Service/productSlice';
import { useGetSingleProductInfoQuery } from '../../Feature/API/productApi';

const FirstStepEdit = ({toggleSelect, display, setDisplay, select,setEditProduct,editProduct}) => {

const dispatch=useDispatch();

useEffect(()=>{
dispatch(addProductName({name:editProduct?.name}))
dispatch(addProductUnit({unit:editProduct?.unit}))
dispatch(addProductMore_information({more_information:editProduct?.more_information}))
},[editProduct])
  return (
    <div>
        <section
              className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}
            >
              <div className="flex">
                <label className="w-[30%]">Name</label>
                <input
               value={editProduct?.name}
               onChange={(e) => setEditProduct((prevState) => ({
                 ...prevState,
                 name: e.target.value,
               }))}
                  placeholder="Enter product name"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="text"
                  name=""
                  id=""
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
                    value={editProduct?.unit}
                    onChange={(e) => setEditProduct((prevState) => ({
                      ...prevState,
                      unit: e.target.value,
                    }))}
                  placeholder="Enter unit"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="flex">
                <label className="w-[30%]">More info</label>
                <textarea
                  value={editProduct?.more_information}
                  onChange={(e) => setEditProduct((prevState) => ({
                    ...prevState,
                    more_information: e.target.value,
                  }))}
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
  )
}

export default FirstStepEdit
