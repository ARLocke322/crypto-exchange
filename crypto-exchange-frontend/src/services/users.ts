import api from './api';
import type { User } from "../types";

import { apiBaseUrl } from "../constants";
import useAuthStore from "../hooks/useAuthStore";
import usePortfolioStore from '@/hooks/usePortfolioStore';
import useTransactionsStore from '@/hooks/useTransactionsStore';

interface LoginData {
    user: {
        id: number
        username: string
        email: string
    }
    token: string
}

interface SignupData {
    user: {
        id: number
        username: string
        email: string
    }
}

interface LogoutData {
    message: string
}

const getAll = async () => {
  const { data } = await api.get<User[]>(
    `${apiBaseUrl}/users`
  );

  return data;
};

const getById = async (id: number) => {
  const { data } = await api.get<User>(
    `${apiBaseUrl}/users/${id}`
  ); 

  return data;
};

const login = async (username: string, password: string) => {
  const { data } = await api.post<LoginData>('/login', { username, password });
  useAuthStore.getState().setAuth(data.user, data.token);
  usePortfolioStore.getState().fetchPortfolio();
  useTransactionsStore.getState().fetchTransactions();
  return data;
};

const logout = async () => {
  const { data } = await api.delete<LogoutData>('/logout');
  useAuthStore.getState().clearAuth();
  return data;
};

const signup = async (email:string, username: string, password: string) => {
  const { data } = await api.post<SignupData>('/signup', {user: {email, username, password}});
  console.log(data)
  return data;
};

export default {
  getAll, getById, login, logout, signup
};

