import React, { useState } from 'react'
import {BsArrowRight, BsDash} from 'react-icons/bs'
import {MdOutlineEdit} from 'react-icons/md'
import Breadcrumb from '../../Components/Breadcrumb';
import Pagination from '../../Components/Pagination';
import Cookies from 'js-cookie';
import { useGetAllUsersQuery } from '../../Feature/API/userApi';
import { useNavigate } from 'react-router-dom';
import ManageOverview from '../../Components/ManageOverview';

export default function BannedUser() {
  const token = Cookies.get("token")
  const nav = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const {data} = useGetAllUsersQuery({token, currentPage})
  const users = (data?.users.data)
  console.log(data)

  // const rows = users?.map((i, index) => (
  //   <tr  key={i.id}>
  //     <td>{index +1}</td>
  //     <td>{i.name}</td>
  //     <td>{i.role}</td>
  //     <td>{i.email}</td>
  //     <td className="flex gap-5">
  //       <button className='text-[#f5f5f5] text-sm px-4 py-1 rounded border border-[#f5f5f5]'>
  //           RESTORE
  //       </button>
  //       </td>
  //   </tr>
  // ));

  return (
    
    <>
    {/* path breadcrumbs */}
    <div>
      <Breadcrumb showBtn={true} createUser={true} icon={true} btnText={"Create user"} title={"User"} firstRoute={"User"} secondRoute={"Banned"}/>
    </div>
    {/* path breadcrumbs */}
    <div>
      <ManageOverview tableType={"Banned User Overview"}/>
    </div>
    <main className='border border-[#3f4245] rounded-sm mt-7'>
      <table className='w-full text-sm text-center text-[#f5f5f5]' >
      <thead className='text-xs text-[#f5f5f5] uppercase'>
        <tr className='border-b border-[#3f4245]'>
          <th className='px-6 py-4'>No.</th>
          <th className='px-6 py-4'>Name</th>
          <th className='px-6 py-4'>Position</th>
          <th className='px-6 py-4'>Email</th>
          <th className='px-6 py-4'></th>
        </tr>
      </thead>
      <tbody className="text-[#f5f5f5]">
        {users?.map((i,index)=>{
          return(
            <tr  key={i.id} className="border-b border-[#3f4245]">
              <td className="px-6 py-3">{index+1}</td>
              <td className="px-6 py-3">{i?.name}</td>
              <td className="px-6 py-3">{i?.role}</td>
              <td className="px-6 py-3">{i?.email}</td>
              <td className="px-6 py-3">
              <button className='text-[#e8eaed] text-sm px-4 py-1 rounded border border-[#3f4245] hover:bg-[#161618] transition-all'>
          RESTORE
      </button>
              </td>

              


            </tr>
          )
        })}
      </tbody>
    </table>
    </main>
    <div className='py-5'>
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} last_page={data?.users?.last_page}/>
    </div>
    </>
  );
}
