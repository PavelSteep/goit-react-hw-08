import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    const response = await axios.get("/contacts", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    const response = await axios.post("/contacts", contact, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    await axios.delete(`/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return contactId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});







// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Устанавливаем базовый URL для всех запросов
// axios.defaults.baseURL = "https://connections-api.goit.global/";


// const setAuthHeader = token => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
// };

// const clearAuthHeader = token => {
//   axios.defaults.headers.common["Authorization"] = "";
// };

// // Получение списка всех контактов (GET /contacts)
// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       // Отправляем запрос на /contacts
//       const response = await axios.get("/contacts");
//       setAuthHeader(response.data.token);
//       console.log("Fetched contacts:", response.data); // Логируем полученные данные
//       if (response.data.length === 0) {
//         console.warn("There are no contacts on the server!");
//       }
//       return response.data;
//     } catch (error) {
//       console.error("Fetch contacts error:", error); // Логируем ошибку
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Добавление нового контакта (POST /contacts)
// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async ({name, number}, thunkAPI) => {
//     try {
//       // Отправляем запрос на /contacts для создания нового контакта
//       const response = await axios.post("/contacts", {name, number});
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Удаление контакта (DELETE /contacts/{contactId})
// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId, thunkAPI) => {
//     try {
//       // Отправляем запрос на /contacts/{id} для удаления контакта
//       await axios.delete(`/contacts/${contactId}`);
//       clearAuthHeader();
//       return contactId;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Обновление контакта (PUT /contacts/{contactId})
// export const updateContact = createAsyncThunk(
//   'contacts/updateContact',
//   async ({ id, name, number }, thunkAPI) => {
//     try {
//       // Отправляем запрос на /contacts/{id} для обновления контакта
//       const response = await axios.put(`/contacts/${id}`, { name, number });
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// )
