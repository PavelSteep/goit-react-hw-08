import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice";
import authReducer from "./auth/slice";
import filterReducer from "./filters/slice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
    filter: filterReducer,
  },
});

export default store;
