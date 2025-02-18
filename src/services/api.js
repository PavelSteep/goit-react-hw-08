import axios from 'axios';

// Базовый URL для контактов
const API_URL = 'https://679a5a3c747b09cdccce9830.mockapi.io/contacts';

// Базовый URL для логина
const API_LOGIN_URL = 'https://connections-api.goit.global/';

// Инстанция axios для работы с контактами
const apiContacts = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Инстанция axios для работы с логином
const apiLogin = axios.create({
  baseURL: API_LOGIN_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiContacts, apiLogin };
