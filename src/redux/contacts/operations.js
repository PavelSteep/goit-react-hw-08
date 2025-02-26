import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiContacts } from '../../services/api';

const API_URL = 'https://679a5a3c747b09cdccce9830.mockapi.io/contacts';


const setAuthHeader = token => {
  apiContacts.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
};

const clearAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = "";
};

// GET @ /contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL)
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST @ /contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, contact);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE @ /contact/:id
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      clearAuthHeader();
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PATCH @ /contacts/:id
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, contact }, thunkAPI) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
