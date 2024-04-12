import axios from "axios";
import { BASE_URL } from "../constants";

type LoginType = {
  email: string;
  password: string;
};

type SetPasswordType = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export const login = async ({ email, password }: LoginType) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  return res.data.data;
};

export const emailExists = async (email: string) => {
  const res = await axios.get(
    `${BASE_URL}/auth/check-email-status?email=${email}`
  );

  return res.data;
};

export const setPassword = async ({
  email,
  newPassword,
  confirmPassword,
}: SetPasswordType) => {
  const res = await axios.post(
    `${BASE_URL}/auth/set-password?email=${email}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`
  );

  res.data;
};
