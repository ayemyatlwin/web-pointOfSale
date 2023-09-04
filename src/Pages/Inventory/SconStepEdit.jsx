import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  addProductActual_price,
  addProductSale_price,
} from "../../Feature/Service/productSlice";

const SconStepEdit = ({ editData }) => {
  const dispatch = useDispatch();
  const [actualPrice, setActualPrice] = useState(editData?.actual_price);
  const [salePrice, setSalePrice] = useState(editData?.sale_price);

  useEffect(() => {
    dispatch(addProductActual_price({ actual_price: actualPrice }));
    dispatch(addProductSale_price({ sale_price: salePrice }));
  }, [actualPrice, salePrice]);

  return (
    <div>
      <section className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}>
        <div className="flex">
          <label className="w-[30%]">actual-price</label>
          <input
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.value)}
            placeholder="Enter actual price of the product"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex">
          <label className="w-[30%]">sale-price</label>
          <input
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="Enter the price that you want to sell "
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>
      </section>
    </div>
  );
};

export default SconStepEdit;
