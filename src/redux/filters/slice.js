import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { filter: "" }, // Делаем filter строкой
  reducers: {
    setFilter: (state, action) => {
      if (typeof action.payload === "string") {
        state.filter = action.payload;
      } else if (action.payload && typeof action.payload.filter === "string") {
        state.filter = action.payload.filter; // Извлекаем строку из объекта
      } else {
        console.error("setFilter получил некорректный payload:", action.payload);
      }
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
