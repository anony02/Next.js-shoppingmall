import axios from 'axios';
import { generateTempPassword } from './generateTempPassword';
import { Product, User } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://dummyjson.com/products?limit=0');
  return response.data.products;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get(
    'https://dummyjson.com/products/category-list'
  );
  return response.data;
};

export const fetchCategoryProducts = async (category: string) => {
  const response = await axios.get(
    `https://dummyjson.com/products/category/${category}`
  );
  return response.data.products;
};

export const fetchProductById = async (id: number) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};

export const fetchProduct = async (id: number) => {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
};

// register.tsx
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkEmailExists = async (email: string): Promise<User[]> => {
  const response = await apiClient.get(`/users?email=${email}`);
  return response.data;
};

export const checkUsernameExists = async (username: string) => {
  const response = await apiClient.get(`/users?username=${username}`);
  return response.data;
};

export const registerUser = async ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const response = await apiClient.post('/users', {
    email,
    username,
    password,
  });
  return response.data;
};

// find-password.tsx
export const updatePassword = async (user: User): Promise<User> => {
  const tempPassword = generateTempPassword();
  sendEmail(user.email, tempPassword);
  const response = await apiClient.patch(`/users/${user.id}`, {
    password: tempPassword,
  });
  return response.data;
};

const sendEmail = async (email: string, tempPassword: string) => {
  await axios.post('/api/sendEmail', { email, tempPassword });
};

// change-email.tsx
export const changeEmail = async (id: string, email: string) => {
  const response = await apiClient.patch(`users/${id}`, { email });
  return response.data;
};

// change-password.tsx
export const changePassword = async (id: string, password: string) => {
  const res = await apiClient.get(`users/${id}`);
  if (res.data.password === password)
    throw new Error('기존 비밀번호와 동일합니다');
  const response = await apiClient.patch(`users/${id}`, { password });
  return response.data;
};

// mypage.tsx
export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`users/${id}`);
  return response.data;
};
