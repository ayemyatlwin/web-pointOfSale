import React from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import { AiOutlineOrderedList, AiOutlineShoppingCart, AiTwotonePlusCircle } from "react-icons/ai";
import { PiCoinsDuotone } from "react-icons/pi";
import { useState } from "react";
import { Input, Pagination, Progress, Text ,Select} from "@mantine/core";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { BsFillGridFill } from "react-icons/bs";

import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useGetStockOverviewQuery } from "../../Feature/API/reportSaleApi";
import Cookies from "js-cookie";
ChartJS.register(...registerables);

const ReportStock = () => {

  const token=Cookies.get("token");
  // const rows = productDetailedInfo?.map((element, i) => (
 
  //   <tr key={element.product_id} className="border-b border-[#3f4245]">
  //     <td className="px-6 py-4">{i + 1}</td>
  //     <td className="px-6 py-4">{element.name}</td>
  //     <td className="px-6 py-4">{element.brand_name}</td>
  //     <td className="px-6 py-4">{element.unit}</td>
  //     <td className="px-6 py-4">{element.total_stock}</td>
 

  //     <td className=" text-white">
   
  //       <div className="  ms-4 flex  ">
      
  //         <Group position="center">
  //           <Button   onClick={()=>nav(`/stock-adding/${element.product_id}`)}>
  //             <IoMdAddCircleOutline  className=" cursor-pointer hover:text-blue-700" />
  //           </Button>
  //         </Group>
          
          
  //       </div>
  //     </td>
  //   </tr>
  // ));
  //bar chart config

  console.log(token);
  const stockData=useGetStockOverviewQuery(token);

  console.log(stockData);
const instockProduct=stockData?.data?.overview?.instock/100 *stockData?.data?.total_products;
const lowStockProduct=stockData?.data?.overview?.low_stock/100 *stockData?.data?.total_products;
const outOfStockProduct=stockData?.data?.overview?.out_of_stock/100 *stockData?.data?.total_products;
const bLabels=stockData?.data?.best_seller_brands?.map((e)=>e?.brand_name.slice(0,4));
const bData=stockData?.data?.best_seller_brands?.map((e)=>e?.total_quantity)
console.log(bLabels);
  const nav=useNavigate();
  const data = {
    labels: bLabels,
    datasets: [
      {
        data: bData,
        backgroundColor: ["#8AB4B8", "#36A2EB", "#0e5a82", "#e8eaed",'#363985'],
        borderColor: "rgba(0, 0, 0, 0)", // Set the border color to transparent
        borderWidth: 0,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    // Disable aspect ratio to adjust the chart size
    responsive: true, // Enable chart responsiveness
    title: {
      display: true,
      text: "Customized Doughnut Chart",
      fontSize: 50,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = ((currentValue / total) * 100).toFixed(2) + "%";
          return `${
            data.labels[tooltipItem.index]
          }: ${currentValue} (${percentage})`;
        },
      },
    },

    plugins: {
      legend: {
        position: "bottom", // Display the legend below the chart
        labels: {
          usePointStyle: true, // Use dot style for legend items
          fontSize: 20, // Adjust the font size of the legend labels
          fontColor: "black",
        },
      },
    },
  };
  const colorCodes = ["#8AB4B8", "#36A2EB", "#0e5a82", "#e8eaed", '#363985'];

const updatedBrands = stockData?.data?.best_seller_brands?.map((brand, index) => ({
  ...brand,
  colorCode: colorCodes[index % colorCodes.length] // Use modulus operator to cycle through colorCodes
}));
console.log(updatedBrands);
  const [hovered, setHovered] = useState(-1);
  const reset = () => setHovered(-1);
  return (
    <div>
      {/* upper section */}
      <div className=" flex justify-between items-center">
        <Breadcrumb
          showBtn={false}
          title={"Stocks"}
          firstRoute={"Report"}
          secondRoute={"Stocks"}
        />
        <div className="  ">
          <button   onClick={() => {
              nav("/sale-recent");
            }} className=" hover:border-blue-300 hover:text-white mx-8 px-6 py-2   font-bold  border  border-white rounded-sm text-blue-300 ">
            Go to shop
          </button>

          <button
            onClick={() => {
              nav("/adding-product");
            }}
            className=" hover:opacity-80 px-6 py-2   font-bold  border  rounded-sm text-black bg-blue-300 "
          >
            + Add Products
          </button>
        </div>
      </div>
      <div className=" my-6">
        {/* graphs section */}
        <div className=" mb-10 flex justify-center items-center">
          {/* left side graph */}
          <div className="w-[50%]">
            {/* upper section graph */}
            <div className=" mb-4 flex justify-around items-center">
              {/* total product */}
              <div className="w-[50%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
                <div className=" my-6 flex items-center justify-around">
                  <div
                    className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
                  >
                    <AiOutlineShoppingCart
                      className={`w-full h-full border text-blue-500 border-solid border-blue-500 bg-[#434446] rounded-full p-2`}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className=" text-2xl font-extrabold tracking-wide">
                  {stockData?.data?.total_products}
                    </p>
                    <p className=" tracking-tight font-thin text-sm">
                      Total Products
                    </p>
                  </div>
                </div>
              </div>
              {/* total brands */}
              <div className="w-[50%] border border-[#3f4245] py-2 px-3 rounded-md">
                <div className=" my-6 flex items-center justify-around">
                  <div
                    className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
                  >
                    <PiCoinsDuotone
                      className={`w-full h-full border text-blue-500 border-solid border-blue-500 bg-[#434446] rounded-full p-2`}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className=" text-2xl font-extrabold tracking-wide">
                    {stockData?.data?.total_brands}
                    </p>
                    <p className=" tracking-tight font-thin text-sm">
                      Total Brands
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* lower section(bar section) */}
            <div className="  border border-[#3f4245]">
              <div className=" my-4 flex items-center justify-around">
                <div>
                  <Progress
                    className=" w-[300px]"
                    animate
                    onMouseLeave={() => setHovered(-1)}
                    size="md"
                    radius="sm"
                    sections={[
                      {
                        value: stockData?.data?.overview?.instock,
                        color: "#07f51b",
                        onMouseEnter: () => setHovered(0),
                        onMouseLeave: reset,
                      },
                      {
                        value: stockData?.data?.overview?.low_stock,
                        color: "#26e2f0",
                        onMouseEnter: () => setHovered(1),
                        onMouseLeave: reset,
                      },
                      {
                        value: stockData?.data?.overview?.out_of_stock,
                        color: "#e3293f",
                        onMouseEnter: () => setHovered(2),
                        onMouseLeave: reset,
                      },
                    ]}
                  />
                </div>
                <div>
                  <p className=" text-2xl font-extrabold tracking-wide">
                  {stockData?.data?.total_products}
                  </p>
                  <p className=" tracking-tight font-thin text-sm">Products</p>
                </div>
              </div>

              <div className="my-4">
            
                <div className=" flex items-center justify-between  border-b-2 border-[#3f4245]">
                  <div className=" flex items-center justify-around">
                    <AiTwotonePlusCircle className=" text-[#07f51b] mx-2" />
                    <p>Instock</p>
                  </div>
                  <div className=" flex items-center justify-around">
                    <p className="  mx-2">{Math.round(instockProduct)}</p>
                    <div className=" flex items-center justify-around">
                      <p className="mx-2">{Math.round(stockData?.data?.overview?.instock)}%</p>
                      <MdKeyboardArrowUp className=" text-3xl font-bold text-[#07f51b]" />
                    </div>
                  </div>
                </div>
                <div className=" flex items-center justify-between  border-b-2 border-[#3f4245]">
                  <div className=" flex items-center justify-around">
                    <AiTwotonePlusCircle className=" text-[#26e2f0] mx-2" />
                    <p>Low Stock</p>
                  </div>
                  <div className=" flex items-center justify-around">
                    <p className=" mx-2">{Math.round(lowStockProduct)}</p>
                    <div className=" flex items-center justify-around">
                      <p className="mx-2">{Math.round(stockData?.data?.overview?.low_stock)}%</p>
                      <MdKeyboardArrowUp className=" text-3xl font-bold text-[#07f51b]" />
                    </div>
                  </div>
                </div>
                <div className=" flex items-center justify-between  ">
                  <div className=" flex items-center justify-around">
                    <AiTwotonePlusCircle className=" text-[#e3293f] mx-2" />
                    <p>Out of Stock</p>
                  </div>
                  <div className=" flex items-center justify-around">
                    <p className=" mx-2">{Math.round(outOfStockProduct)}</p>
                    <div className=" flex items-center justify-around">
                      <p className="mx-2">{Math.round(stockData?.data?.overview?.out_of_stock)}%</p>
                      <MdKeyboardArrowUp className=" text-3xl font-bold text-[#07f51b]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right side graph */}
          <div className="p-4 mx-4 border border-[#3f4245]">
            <div className=" flex-col items-center justify-center ">
              <div className=" block ">
                <h1 className=" block text-2xl font-extrabold tracking-wide">
                  Best Seller Brand
                </h1>
              </div>
              <div className="">
                <h1 className=" text-right text-2xl font-extrabold tracking-wide">
                  620,000k
                </h1>
                <h1 className=" text-right tracking-tight font-thin text-sm">
                  Kyats
                </h1>
              </div>
              <div className=" flex items-center justify-center">
                <div className="w-[50%] h-[200px]">
                  <Doughnut data={data} options={options} />
                </div>
                <div className="my-4">
                  {updatedBrands?.map((e)=>(
 <div className="  my-4 flex items-center justify-between  border-b-2 border-[#3f4245]">
 <div className=" flex items-center justify-around">
   <AiTwotonePlusCircle style={{color:e?.colorCode}} className={`  mx-2` }/>
   <p>{e?.brand_name?.slice(0,4)}</p>

   
 </div>
 <div className=" flex items-center justify-around">
   <p className=" mx-2">{e?.total_quantity}</p>
   <div className=" flex items-center justify-around">
     <p className="mx-2">70%</p>
     <MdKeyboardArrowUp className=" text-3xl font-bold text-[#07f51b]" />
   </div>
 </div>
</div>
                  ))}
                 
                
                
                 
                </div>
                <div></div>
              </div>
              <div className=" ms-[400px]">
                <button  className=" hover:opacity-60 rounded-lg px-3 py-2 border-2 border-[#3f4245]">
                  RECENT SALES
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        {/* table section */}
        <div>
      <div className=" flex justify-between items-center">
  
   
      </div>
      <div>
      <h2 className=" my-5 tracking-wide text-[1.5rem]">Today Sales Overview</h2>
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
        <div
          className={`block overflow-y-auto`}
        >
       <main className="border border-[#3f4245] rounded-sm mt-7 ">
            <table className="w-full text-sm text-center text-[#f5f5f5]">
              <thead className="text-xs text-[#f5f5f5] uppercase ">
                <tr className="border-b border-[#3f4245]">
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4">Sale Price</th>
                  <th className="px-6 py-4">Total Stock</th>
                  <th className="px-6 py-4"> Stock Level</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              {/* map data from old recorded voucher list from api */}
              {/* <tbody className="text-[#f5f5f5]">{rows}</tbody> */}
            </table>
          </main>
          <div className=" my-8">
            {/* <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              last_page={data?.meta.to}
            /> */}
          </div>
        </div>
        {/* <div
          className={`${
            displayState ? "flex" : "hidden"
          }   my-6 overflow-y-auto  flex-wrap  justify-center gap-10 items-center`}
        >
          {productDetailedInfo?.map((i) => {
            return (
              <div key={i.product_id} className=" w-[250px]  bg-white border overflow-hidden  border-[#3f4245] rounded-lg shadow ">
                <img
                  src={i.photo}
                  className=" w-[250px] object-fill h-40 "
                  alt=""
                />
                <div className="p-2 bg-[#161618] ">
                  <p className="mb-1  text-lg text-right font-medium tracking-wide text-[#E8EAED] ">
                    {i.name}
                  </p>
                  <p className="mb-1 text-right text-md text-[#E8EAED] font-normal  ">
                    {i.sale_price}
                  </p>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
      </div>
    </div>
  );
};

export default ReportStock;
