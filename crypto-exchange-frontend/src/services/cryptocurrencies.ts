import api from './api';
import { apiBaseUrl } from "../constants";
import type { CryptocurrencyData } from '@/types';

const getCryptocurrencies = async () => {
    const { data } = await api.get<CryptocurrencyData[]>(
        `${apiBaseUrl}/cryptocurrencies`
    );
    return data;
};


export default {
    getCryptocurrencies
};

