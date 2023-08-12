import { useMutation, useQuery } from '@tanstack/react-query';
import photoCutsApis from './apis';
import photoCutsKeys from './keys';
import { CreateCuts, EditCuts } from './type';

const useEditPhotoCut = () => {
  return useMutation({
    mutationFn: (body: EditCuts) => photoCutsApis.editPhotoCut(body),
  });
};

const useCreatePhotoCut = () => {
  return useMutation({
    mutationFn: (body: CreateCuts) => photoCutsApis.createPhotoCut(body),
  });
};

const useGetPhotoCut = (cutId: number) => {
  return useQuery({
    queryFn: () => photoCutsApis.getPhotoCut(cutId),
    queryKey: photoCutsKeys.item(cutId),
  });
};

const useDeletePhotoCut = () => {
  return useMutation({
    mutationFn: (cutId: number) => photoCutsApis.deletePhotoCut(cutId),
  });
};

export {
  useEditPhotoCut,
  useCreatePhotoCut,
  useGetPhotoCut,
  useDeletePhotoCut,
};
