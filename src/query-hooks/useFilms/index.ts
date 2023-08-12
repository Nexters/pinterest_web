import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import filmsApis from './api';
import filmsKeys from './keys';

const useGetFilms = (userId: string) => {
  return useQuery({
    queryFn: () => filmsApis.getFilms(userId),
    queryKey: filmsKeys.list(userId),
  });
};

const useEditFilms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ filmId, title }: { filmId: number; title: string }) =>
      filmsApis.editFilms(filmId, title),
    onSuccess: () => {
      const userId = localStorage.get('userId');
      queryClient.invalidateQueries(filmsKeys.list(userId));
    },
  });
};

const useCreateFilms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, userId }: { title: string; userId: string }) =>
      filmsApis.createFilms(title, userId),
    onSuccess: () => {
      const userId = localStorage.get('userId');
      queryClient.invalidateQueries(filmsKeys.list(userId));
    },
  });
};

const useGetFilm = (filmId: number) => {
  return useQuery({
    queryFn: () => filmsApis.getFilm(filmId),
    queryKey: filmsKeys.item(filmId),
  });
};

const useDeleteFilm = () => {
  return useMutation({
    mutationFn: (filmId: number) => filmsApis.deleteFilm(filmId),
    // NOTE: 추가 시 onSuccess 추가 예정
  });
};

export {
  useGetFilms,
  useEditFilms,
  useCreateFilms,
  useGetFilm,
  useDeleteFilm,
  filmsApis,
  filmsKeys,
};
