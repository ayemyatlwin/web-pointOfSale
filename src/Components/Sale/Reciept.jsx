import React, { useState } from "react";
import Calculator from "./Calculator";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Reciept = ({ calculator, printBtn, }) => {
  const {reciept,qty,totalPrice}=useSelector((state)=>state.recieptSlice)
  console.log(reciept);
  const printHandler = () => {
    window.print();
  };
  return (
    <div className="text-[#f5f5f5] bg-[#161618] h-screen   ">
      <div className="flex flex-col h-full">
        <div
          className={`${
            printBtn == true
              ? `h-full overflow-scroll bg-[#161618]`
              : `h-[50%]  overflow-scroll overflow-x-hidden bg-[#161618]`
          }`}
        >
          <Typography
            className=" "
            sx={{ fontSize: "1.5rem", paddingX: "10px" }}
            gutterBottom
          >
            Reciept
          </Typography>
          <div>
            {reciept?.map((item)=>{
              return(
                <div key={item?.product_id} className="mt-5  px-3 pt-2 mx-auto overflow-visible">
                <div className="flex justify-between border-b mb-1 pb-2 border-gray-600">
                  <div className="flex flex-col">
                    <p className="font-semibold leading-loose tracking-wider text-[1rem]">
                      {item?.name.slice(0,7)}
                    </p>
                    <span className="text-[0.8rem] font-thin">
                      <span className="mr-2"> 
                      {qty+1}
                        pcs</span>
                      <span>{item?.actual_price} MMK</span>
                    </span>
                  </div>
                  <span className="text-semibold">{qty+1 * item?.sale_price}</span>
                </div>
              </div>
              )
            })}
           

           
          </div>
        </div>
        {calculator && (
          <div className="h-[50%]  ">
            <Calculator />
          </div>
        )}
        <div className="mt-auto flex flex-col justify-start ">
          {/* total amount */}
          {printBtn && (
            <div className=" mt-5 pt-5 px-5 ">
              {" "}
              <h1 className="text-xl font-medium">
                Total Amount : <span>{totalPrice}</span> MMK
              </h1>
              <span className="text-sm font-thin">Tax : 5000</span>
            </div>
          )}
          {/* Print Button */}
          {printBtn && (
            <button
              onClick={printHandler}
              className="print:hidden mt-5 px-2 py-1 rounded self-center bg-black"
            >
              Print
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reciept;
