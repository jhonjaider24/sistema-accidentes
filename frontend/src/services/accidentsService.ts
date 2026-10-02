import axios from 'axios';
import type { Accident, NewAccident } from '../types/accident';

const API_URL = 'http://localhost:3000/accidents';

export const getAccidents = async (): Promise<Accident[]> => {
  const response = await axios.get<Accident[]>(API_URL);
  return response.data;
};

export const createAccident = async (
  accident: NewAccident,
): Promise<Accident> => {
  const response = await axios.post<Accident>(API_URL, accident);
  return response.data;
};