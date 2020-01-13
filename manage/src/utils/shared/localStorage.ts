const localStorage = window.localStorage;
const tokenKey = 'shop_flatFrom';

export const getToken = () => localStorage.getItem(tokenKey);
export const setToken = (token: string) => localStorage.setItem(tokenKey, token);
export const cleanToken = () => localStorage.removeItem(tokenKey);

const userNameKey = 'shop_userName';

export const setUserName = (userName: string) => localStorage.setItem(userNameKey, userName);
export const getUserName = () => localStorage.getItem(userNameKey);
export const clearUserName = () => localStorage.removeItem(userNameKey);
