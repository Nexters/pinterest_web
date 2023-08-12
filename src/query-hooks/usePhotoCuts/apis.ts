import { CreateCuts, EditCuts } from './type';
import axios from 'axios';

const editPhotoCut = async (body: EditCuts) => {
  const { data } = await axios.put(`/api/photo-cuts`, body);
  return data;
};

const createPhotoCut = async (body: CreateCuts) => {
  const { data } = await axios.post(`/api/photo-cuts`, body);
  return data;
};

const getPhotoCut = async (cutId: number) => {
  const { data } = await axios.get(`/api/photo-cuts/${cutId}`);
  return data;
};

const deletePhotoCut = async (cutId: number) => {
  const { data } = await axios.delete(`/api/photo-cuts/${cutId}`);
  return data;
};

const photoCutsApis = {
  editPhotoCut,
  createPhotoCut,
  getPhotoCut,
  deletePhotoCut,
};

export default photoCutsApis;
