import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod } from '@/constants/httpMethods';
import { AxiosError } from 'axios';
import { instance } from '@/utils/axiosInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === HttpMethod.POST) {
    // Process a POST request
    try {
      const result = await instance.post(`/auth`, req.body);

      return res.status(200).json(result.data);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      } else {
        return res.status(500).json({ message: '알 수 없는 에러' });
      }
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: '사용할 수 없는 메서드입니다' });
  }
}
