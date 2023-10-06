import { createSlice } from "@reduxjs/toolkit";

const initialState={
    dataType:"weekly"
}

export const reportSaleSlice=createSlice({
    name:"report",
    initialState,
    reducers:{
        setDataType: (state, action) => {
        state.dataType = action.payload;}

    }

})

export const {setDataType}=reportSaleSlice.actions;
export default reportSaleSlice.reducer;