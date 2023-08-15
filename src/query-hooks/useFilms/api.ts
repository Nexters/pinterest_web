import axios from 'axios';
import { FilmsResponse } from '@/types/response';

const getFilms = async (userId: string): Promise<FilmsResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/films?user_id=${userId}`,
  );

  return data;
};
const editFilms = async (filmId: number, title: string) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/films`,
    {
      film_id: filmId,
      title,
    },
  );

  return data;
};

const createFilms = async (title: string, userId: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/films`,
    {
      title,
      user_id: userId,
    },
  );

  return data;
};

const getFilm = async (filmId: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/films/${filmId}`,
  );
  return data;
};

const deleteFilm = async (filmId: number) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/films/${filmId}`,
  );
  return data;
};

const filmsApis = {
  getFilms,
  editFilms,
  createFilms,
  getFilm,
  deleteFilm,
};

export default filmsApis;
