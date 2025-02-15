import axios from 'axios';

// Базовый URL для контактов
const API_CONTACTS_URL = 'https://679a5a3c747b09cdccce9830.mockapi.io/';

// Базовый URL для логина
const API_LOGIN_URL = 'https://connections-api.goit.global/';

// Инстанция axios для работы с контактами
const apiContacts = axios.create({
  baseURL: API_CONTACTS_URL,
});

// Инстанция axios для работы с логином
const apiLogin = axios.create({
  baseURL: API_LOGIN_URL,
});

export { apiContacts, apiLogin };
