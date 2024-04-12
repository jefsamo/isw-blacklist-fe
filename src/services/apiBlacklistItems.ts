import axios from "axios";
import { BASE_URL } from "../constants";

type BlacklistType = {
  reason: string;
  token: string;
  itemId: string;
};
type RemoveBlacklistItemType = {
  token: string;
  blacklistItemId: string;
  reason: string;
};

export const createBlacklist = async ({
  token,
  reason,
  itemId,
}: BlacklistType) => {
  const res = await axios.post(
    `${BASE_URL}/blacklist/add?itemId=${itemId}`,
    reason,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAllBlacklistedItems = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/blacklist`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getAllBlacklisted = async (token: string) => {
  const res = await axios.get(
    `${BASE_URL}/blacklist/blacklisted-items-not-paginated`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const getABlacklistedItem = async (token: string, itemId: string) => {
  const res = await axios.get(`${BASE_URL}/blacklist/id?id=${itemId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const getANonBlacklistedItem = async (token: string, itemId: string) => {
  const res = await axios.get(`${BASE_URL}/items/${itemId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const removeBlacklist = async ({
  token,
  blacklistItemId,
  reason,
}: RemoveBlacklistItemType) => {
  const res = await axios.put(
    `${BASE_URL}/blacklist?blacklistedItemId=${blacklistItemId}`,
    reason,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteBlacklist = async ({
  token,
  blacklistItemId,
  reason,
}: RemoveBlacklistItemType) => {
  const res = await axios.delete(
    `${BASE_URL}/blacklist?blacklistedItemId=${blacklistItemId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        removalReason: reason,
      },
    }
  );

  return res.data;
};
