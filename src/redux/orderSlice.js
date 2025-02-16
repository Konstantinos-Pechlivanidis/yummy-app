import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toISOString().split("T")[0],
  time: "",
  guests: 1,
  table: null,
  menuItems: [],
  specialRequest: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    resetOrder: () => initialState, // Resets order to initial state
  },
});

export const { updateOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
