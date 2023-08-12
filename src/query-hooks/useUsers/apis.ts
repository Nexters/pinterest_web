import { CreateUser, CreateVisitLog, EditUser } from './type';
import axios from 'axios';
import { UserResponse } from '@/types/response';

const signInUser = async (userId: string, password: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/auth`,
    {
      user_id: userId,
      password,
    },
  );

  return data;
};

const editUser = async (body: EditUser) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/users`,
    body,
  );

  return data;
};

const createUser = async (body: CreateUser) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/users`,
    body,
  );
  return data;
};

const getUser = async (userId: string): Promise<UserResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/users/${userId}`,
  );
  return data;
};

const getUserVisitLogs = async (userId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/users/${userId}/visit-logs`,
  );
  return data;
};

const createUserVisitLog = async (body: CreateVisitLog) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/users/${body.userId}/visit-logs`,
    body,
  );
  return data;
};

const deleteUserVisitLog = async (userId: string, logId: number) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/users/${userId}/visit-logs/${logId}`,
  );
  return data;
};

const usersApis = {
  signInUser,
  editUser,
  createUser,
  getUser,
  getUserVisitLogs,
  createUserVisitLog,
  deleteUserVisitLog,
};

export default usersApis;
