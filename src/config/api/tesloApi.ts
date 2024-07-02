import axios from 'axios';
import { Platform } from 'react-native';
import { API_URL as PROD_URL, API_URL_ANDROID, API_URL_IOS, STAGE } from '@env';
import { StorageAdapter } from '../adatpers/storage-adapter';

export const API_URL =
  STAGE === 'productions' ? PROD_URL : Platform.OS === 'android' ? API_URL_ANDROID : API_URL_IOS;

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO INTERCEPTORS
tesloApi.interceptors.request.use(async config => {
  const token = await StorageAdapter.getItem('token');
  if (token) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export { tesloApi };
