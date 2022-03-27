// Api for get, post cheese list and purchase history

import { CartItemType, PurchaseRecordType } from '../App';
import axios from 'axios';
// Get cheese list
export const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

//Post purchase records
//set the headers for authentication
const headers = {
  paymenttoken: 'sulaiman',
};
export const createPurchase = async (data: PurchaseRecordType[]) => {
  const { data: response } = await axios.post('api/purchase', data, {
    headers: headers,
  });

  return response.data;
};

// Get purchase records
export const getPurchase = async (): Promise<PurchaseRecordType[]> =>
  (await fetch(`api/purchase`)).json();

export const createCartItem = async (data: CartItemType) => {
  const { data: response } = await axios.post('api/cart', data, {
    headers: headers,
  });

  return response.data;
};

export const patchCartItem = async (data: CartItemType) => {
  const { data: response } = await axios.patch(`api/cart/${data.id}`, data, {
    headers: headers,
  });
  return response.data;
};

export const getCartItem = async (): Promise<CartItemType[]> => {
  return (await fetch(`api/cart`)).json();
}

export const deleteCartItem = async (id: number) => {
  await axios.delete(`api/cart/${id}`, {
    headers: headers,
  });
};

