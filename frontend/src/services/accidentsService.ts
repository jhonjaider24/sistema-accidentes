import axios from 'axios';

const API_URL = 'http://localhost:3000/accidents';

export const getAccidents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAccident = async (accident: {
  titulo: string;
  descripcion: string;
  ubicacion: string;
}) => {
  const response = await axios.post(API_URL, accident);
  return response.data;
};