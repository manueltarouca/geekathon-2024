import axios from 'axios';
import api from '../utils/axios';

export const getAuth = async (email: string) => {
  try {
    const response = await api
      .post(`/auth/get-auth`, { email })
      .then(response => response)
      .catch(error => error.response);
    return response.data as ResponseType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await api
      .get(`/auth/me`)
      .then(response => response)
      .catch(error => error.response);
    return response.data as ResponseType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signin = async (email: string, password: string) => {
  try {
    const response = await api
      .post(`/auth/login`, { email, password })
      .then(response => response)
      .catch(error => error.response);
    return response.data as ResponseType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email,
        password,
      })
      .then(response => response)
      .catch(error => error.response);
    return response.data as ResponseType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
