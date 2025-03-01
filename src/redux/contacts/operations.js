import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://679a5a3c747b09cdccce9830.mockapi.io/contacts';

// const API_URL = 'https://679a5a3c747b09cdccce9830.mockapi.io/contacts';

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




















// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { apiContacts } from "../../services/api";


// // axios.defaults.baseURL = "https://679a5a3c747b09cdccce9830.mockapi.io/contacts/";
// const API_URL = "https://679a5a3c747b09cdccce9830.mockapi.io/contacts";
// axios.defaults.baseURL = API_URL;
// // const API_URL = "https://679a5a3c747b09cdccce9830.mockapi.io/contacts";

// // Устанавливает заголовок авторизации с токеном
// const setAuthHeader = (token) => {
//   apiContacts.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// // Очищает заголовок авторизации
// const clearAuthHeader = () => {
//   apiContacts.defaults.headers.common["Authorization"] = "";
// };

// // Запрос списка контактов (GET /contacts)
// export const fetchContacts = createAsyncThunk(
//   "contacts/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(API_URL);
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Добавление нового контакта (POST /contacts)
// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (contact, thunkAPI) => {
//     try {
//       const response = await axios.post(API_URL, contact);
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Удаление контакта (DELETE /contacts/:id)
// export const deleteContact = createAsyncThunk(
//   "contacts/deleteContact",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       clearAuthHeader();
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Обновление контакта (PATCH /contacts/:id)
// export const updateContact = createAsyncThunk(
//   "contacts/updateContact",
//   async ({ id, contact }, thunkAPI) => {
//     try {
//       const response = await axios.patch(`${API_URL}/${id}`, contact);
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Функция обновления данных пользователя, но теперь использует API контактов вместо /users/me
// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const reduxState = thunkAPI.getState();
//     const savedToken = reduxState.auth.token;

//     if (!savedToken) {
//       return thunkAPI.rejectWithValue("Нет токена");
//     }

//     setAuthHeader(savedToken);

//     try {
//       // Запрашиваем контакты вместо запроса к /users/me
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
//   {
//     condition(_, thunkAPI) {
//       const reduxState = thunkAPI.getState();
//       return reduxState.auth.token !== null;
//     },
//   }
// );
