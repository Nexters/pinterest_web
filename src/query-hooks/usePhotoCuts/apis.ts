import { CreateCuts, EditCuts } from './type';
import axios from 'axios';

const editPhotoCut = async (body: EditCuts) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/photo-cuts`,
    body,
  );
  return data;
};

const createPhotoCut = async (body: CreateCuts) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/photo-cuts`,
    body,
  );
  return data;
};

const getPhotoCut = async (cutId: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/photo-cuts/${cutId}`,
  );
  return data;
};

const deletePhotoCut = async (cutId: number) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/photo-cuts/${cutId}`,
  );
  return data;
};

const photoCutsApis = {
  editPhotoCut,
  createPhotoCut,
  getPhotoCut,
  deletePhotoCut,
};

export default photoCutsApis;
