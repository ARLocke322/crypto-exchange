import api from './api';
import { apiBaseUrl } from "../constants";
import type { CryptocurrencyData } from '@/types';

const getCryptocurrencies = async () => {
    const { data } = await api.get<CryptocurrencyData[]>(
        `${apiBaseUrl}/cryptocurrencies`
    );
    return data;
};

const getChart = async (cryptocurrency_id: number, period: string) => {
    const { data } = await api.get<ChartData>(
        `${apiBaseUrl}/cryptocurrencies/${cryptocurrency_id}/chart?period=${period}`
    );
    return data;
}


export default {
    getCryptocurrencies, getChart
};

