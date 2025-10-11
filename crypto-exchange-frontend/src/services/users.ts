import axios from "axios";
import type { User } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<User[]>(
    `${apiBaseUrl}/users`
  );

  return data;
};

const getById = async (id: number) => {
  const { data } = await axios.get<User>(
    `${apiBaseUrl}/users/${id}`
  ); 

  return data;
};

export default {
  getAll, getById
};

