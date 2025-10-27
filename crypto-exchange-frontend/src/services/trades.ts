import api from './api';

interface Wallet {
  user_id: number
  usd_amount: number
}
interface CryptocurrencyTransaction {
  wallet: Wallet
  cryptocurrency_id: number
  transaction_type: string
  price_per_unit: number
  usd_amount: number
}

const postTrade = async (wallet_id: number, transaction_type: string, cryptocurrency_id: number, crypto_amount: number) => {
  const { data } = await api.post<CryptocurrencyTransaction>('/trades',
    {
      trade: { wallet_id, transaction_type, cryptocurrency_id, crypto_amount }
    });
  return data;
};



export default {
  postTrade
};

