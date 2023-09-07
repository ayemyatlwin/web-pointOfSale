import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

const SaleHandlerGuard = ({children}) => {
  const { saleClose } = useSelector((state) => state.recieptSlice);
  console.log(saleClose);

  if(saleClose == true) return children;
  else return <Navigate to={'/sale-recent'}/>
  
}

export default SaleHandlerGuard
