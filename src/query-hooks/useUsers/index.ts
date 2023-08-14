import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import usersApis from './apis';
import usersKeys from './keys';
import { CreateUser, CreateVisitLog, EditUser } from './type';

interface VisitLogResponse {
  log_id: number;
  user_id: string;
  created_at: string;
  name: string;
  text: string;
}

const useSignInUser = () => {
  return useMutation({
    mutationFn: ({ userId, password }: { userId: string; password: string }) =>
      usersApis.signInUser(userId, password),
  });
};

const useEditUser = () => {
  return useMutation({
    mutationFn: (body: EditUser) => usersApis.editUser(body),
  });
};

const useCreateUser = () => {
  return useMutation({
    mutationFn: (body: CreateUser) => usersApis.createUser(body),
  });
};

const useGetUser = (userId: string) => {
  return useQuery({
    queryFn: () => usersApis.getUser(userId),
    queryKey: usersKeys.item(userId),
  });
};

const useGetUserVisitLogs = (userId: string) => {
  return useQuery<VisitLogResponse[]>({
    queryFn: () => usersApis.getUserVisitLogs(userId),
    queryKey: usersKeys.visitLogs(userId),
  });
};

const useCreateUserVisitLog = () => {
  return useMutation({
    mutationFn: (param: CreateVisitLog) => usersApis.createUserVisitLog(param),
  });
};

const useDeleteUserVisitLog = () => {
  return useMutation({
    mutationFn: ({ userId, logId }: { userId: string; logId: number }) =>
      usersApis.deleteUserVisitLog(userId, logId),
  });
};

export {
  useSignInUser,
  useEditUser,
  useCreateUser,
  useGetUser,
  useGetUserVisitLogs,
  useCreateUserVisitLog,
  useDeleteUserVisitLog,
  usersApis,
  usersKeys,
};
