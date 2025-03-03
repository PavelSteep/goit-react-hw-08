import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { filter: "" }, // Делаем filter частью объекта
  reducers: {
    setFilter: (state, action) => {
      if (typeof action.payload === "object") {
        state.filter = JSON.stringify(action.payload);
      } else {
        state.filter = action.payload;
      }
    },      
  },
});


export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
