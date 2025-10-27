import api from './api';
import { apiBaseUrl } from "../constants";
import type { PortfolioData } from '@/types';

const getPortfolio = async () => {
    const { data } = await api.get<PortfolioData>(
        `${apiBaseUrl}/portfolio`
    );

    return data;
};


export default {
    getPortfolio
};

