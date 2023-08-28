import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reciept: [],
  totalPrice: 0,
  activeValue: null,
  initialChanged: null,
  tax: 0,
  listSelector: 1,
}; 

const totalAmount = (reciept) => {
  return reciept.reduce((pv, cv) => pv + cv.sale_price * cv.quantity, 0);
};

const totalTax = (reciept) => {
  return reciept.reduce(
    (pv, cv) => (pv + cv.sale_price * cv.quantity) * (5 / 100),
    0
  );
};

export const recieptSlice = createSlice({
  name: "reciept",
  initialState,
  reducers: {
    // from card to list
    addtoReciept: (state, { payload }) => {
      const isExisted = state.reciept.find(
        (item) => item.product_id === payload.product_id
      );
      if (isExisted) {
        return state;
      } else {
        state.reciept = [...state.reciept, { ...payload, quantity: "1" }];
      }
      state.totalPrice = totalAmount(state.reciept);
      state.tax = totalTax(state.reciept);
    },
    setListSelector: (state, { payload }) => {
      state.listSelector = payload;
      state.initialChanged = true;
    },
    decreaseQty: (state, { payload }) => {
      state.reciept.map((item) => {
        if (item.product_id === payload && item.quantity != "") {
          return (item.quantity = item.quantity.substring(
            0,
            item.quantity.length - 1
          ));
        } else if (item.quantity == "") {
          return (state.reciept = state.reciept.filter(
            (item) => item.product_id != payload
          ));
        } else {
          return state;
        }
      });
    },
    // for calculator input
    inputUpdate: (state, { payload }) => {
      state.activeValue = payload;
    },
    // while click on list show list.product_id
    qtyUpdate: (state, { payload }) => {
      state.reciept.map((ele) => {
        if (state.initialChanged && ele.product_id === payload.id) {
          return (
            (ele.quantity = payload.qty),
            (state.initialChanged = false),
            (state.totalPrice = totalAmount(state.reciept)),
            (state.tax = totalTax(state.reciept))
          );
        } else if (ele.product_id === payload.id) {
          return (
            (ele.quantity += payload.qty),
            (state.total = totalAmount(state.reciept)),
            (state.tax = totalTax(state.reciept))
          );
        } else {
          return ele;
        }
      });
    },
    clearList: (state) => {
      state.reciept = [];
    },
  },
});
export const {
  addtoReciept,
  qtyUpdate,
  decreaseQty,
  inputUpdate,
  clearList,
  setListSelector,
} = recieptSlice.actions;
export default recieptSlice.reducer;