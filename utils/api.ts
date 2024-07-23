import axios from 'axios';
import { Product } from '../types';

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