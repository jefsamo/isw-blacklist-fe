import axios from "axios";
import { BASE_URL } from "../constants";

type CreateItemType = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
  token: string;
};

export const getItems = async (token: string) => {
  const res = await axios.get(
    `${BASE_URL}/items/non-blacklisted-items-paginated`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const getItemsTotal = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/items/all-items-paginated`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getAllItems = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/items/all-items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const getCategories = async (token: string) => {
  try {
  const res = await axios.get(`${BASE_URL}/items/categories`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
  catch (error) {
    console.error("Error fetching categories:", error);
  }
  
};

export const createItem = async ({
  category,
  description,
  imageUrl,
  name,
  price,
  quantity,
  token,
}: CreateItemType) => {
  const res = await axios.post(
    `${BASE_URL}/items`,
    {
      category,
      description,
      imageUrl,
      name,
      price,
      quantity,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res);
  return res.data;
};

export const getAllNonBlacklistedItems = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/items/non-blacklisted-items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const checkValidToken = async (token: string) => {
  const res = await axios.post(`${BASE_URL}/auth/validate-token`, token, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
