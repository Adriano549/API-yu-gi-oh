import { Card } from "../types/typesCard";
import { api } from "./apiYugi";

export const fetchCards = async (): Promise<Card[]> => {
    const response = await api.get('/cardinfo.php');
    return response.data.data;
};