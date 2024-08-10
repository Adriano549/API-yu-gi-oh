import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7'
});

export  const getCardById = async (id: string) => {
    const { data } = await api.get(`/cardinfo.php?id=${id}`);
    return data.data[0];
};
