import axios from 'axios';

const getFilms = async (userId: string) => {
  const { data } = await axios.get(`/api/films?userId=${userId}`);

  return data;
};
const editFilms = async (filmId: number, title: string) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/films`,
    {
      filmId,
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
      userId,
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
