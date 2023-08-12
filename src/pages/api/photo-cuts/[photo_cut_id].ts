import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod } from '@/constants/httpMethods';
import { AxiosError } from 'axios';
import { instance } from '@/utils/axiosInstance';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const photo_cut_id = req.query.photo_cut_id;
  const url = `/photo-cuts/${photo_cut_id}`;

  try {
    if (req.method === HttpMethod.GET) {
      const result = await instance.get(url);

      return res.status(200).json(result.data);
    } else if (req.method === HttpMethod.DELETE) {
      const result = await instance.post(url);

      return res.status(200).json(result.data);
    } else {
      return res.status(405).json({ message: '사용할 수 없는 메서드입니다' });
    }
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: '알 수 없는 에러' });
    }
  }
}
