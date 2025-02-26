import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiContacts } from '../../services/api';

const API_URL = 'https://679a5a3c747b09cdccce9830.mockapi.io/contacts';

const setAuthHeader = token => {
  apiContacts.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete apiContacts.defaults.headers.common["Authorization"];
};

// Получение списка контактов
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Добавление контакта
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Удаление контакта
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Обновление контакта
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

// Восстановление пользователя при наличии токена
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const savedToken = reduxState.auth.token;

    if (!savedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(savedToken);

    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
