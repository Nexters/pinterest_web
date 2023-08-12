import axios from 'axios';

const getFilms = async (userId: string) => {
  const { data } = await axios.get(`/api/films?userId=${userId}`);

  return data;
};

const editFilms = async (filmId: number, title: string) => {
  const { data } = await axios.put(`/api/films`, {
    filmId,
    title,
  });

  return data;
};

const createFilms = async (title: string, userId: string) => {
  const { data } = await axios.post(`/api/films`, {
    title,
    userId,
  });

  return data;
};

const getFilm = async (filmId: number) => {
  const { data } = await axios.get(`/api/films/${filmId}`);
  return data;
};

const deleteFilm = async (filmId: number) => {
  const { data } = await axios.delete(`/api/films/${filmId}`);
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
