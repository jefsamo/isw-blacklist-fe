import axios from "axios";
import { BASE_URL } from "../constants";

type DeleteType = {
  token: string;
  id: string;
};
type CreateType = {
  email: string;
  role: string;
  token: string;
  userAdminId: string;
};

type UserType = {
  firstName: string;
  lastName: string;
  imageUrl: string;
};

export const getUsers = async (token: string, page: number) => {
  const res = await axios.get(`${BASE_URL}/user?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getAllUsers = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/user/get-all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteUser = async ({ token, id }: DeleteType) => {
  const res = await axios.delete(`${BASE_URL}/user?userId=${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const createUser = async ({
  email,
  role,
  token,
  userAdminId,
}: CreateType) => {
  const res = await axios.post(
    `${BASE_URL}/user?userAdminId=${userAdminId}`,
    {
      email,
      role,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getUser = async (token: string, userId: string) => {
  const res = await axios.get(`${BASE_URL}/user/userId?userId=${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateUser = async (
  token: string,
  userId: string,
  body: UserType
) => {
  const res = await axios.put(`${BASE_URL}/user?userId=${userId}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
