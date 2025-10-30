import type { TransactionData } from '@/types';
import api from './api';

const getTransactions = async () => {
  const { data } = await api.get<TransactionData[]>('/transactions');
  return data;
};

export default {
  getTransactions
};

