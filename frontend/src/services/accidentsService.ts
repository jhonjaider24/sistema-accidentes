import axios from 'axios';
import type { Accident, NewAccident } from '../types/accident';

const API_URL = 'http://localhost:3000/accidents';

export const getAccidents = async (busqueda?: string): Promise<Accident[]> => {
  const response = await axios.get<Accident[]>(API_URL, {
    // Axios arma la URL (?q=...) y codifica los caracteres especiales.
    params: busqueda ? { q: busqueda } : undefined,
  });
  return response.data;
};

export const createAccident = async (
  accident: NewAccident,
): Promise<Accident> => {
  const response = await axios.post<Accident>(API_URL, accident);
  return response.data;
};