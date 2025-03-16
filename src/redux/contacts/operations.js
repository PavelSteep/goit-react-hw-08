import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

// Устанавливаем заголовок Authorization с токеном
const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Убираем заголовок Authorization
const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

// Операции с контактами
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    const response = await axios.post("/contacts", contact);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    await axios.delete(`/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
