// utils/auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Błąd zapisu tokena:', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('Błąd pobierania tokena:', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Błąd usuwania tokena:', e);
  }
};

export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token;
};
