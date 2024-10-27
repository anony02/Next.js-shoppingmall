import { atom } from 'recoil';
import { Product, CartState } from '../types';

export const productListState = atom<Product[]>({
  key: 'productListState',
  default: [],
});

export const filterState = atom<string>({
  key: 'filterState',
  default: '',
});

export const categoryListState = atom<string[]>({
  key: 'categoryListState',
  default: [],
});

// cart.tsx
const getCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('cart') || '{}');
  }
  return {};
};

export const cartState = atom<CartState>({
  key: 'cartState',
  default: getCartFromLocalStorage(),
});

export const productsState = atom({
  key: 'productsState',
  default: {},
});

export const totalPriceState = atom({
  key: 'totalPriceState',
  default: 0,
});

// Search.tsx
export const searchInputState = atom<string>({
  key: 'searchInputState',
  default: '',
});

export const searchDropdownState = atom<string[]>({
  key: 'searchDropdownState',
  default: [],
});
