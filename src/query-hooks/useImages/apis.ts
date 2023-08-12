import axios from 'axios';

const getPresignedUrl = async (filename: string) => {
  const { data } = await axios.get(`/api/images?filename=${filename}`);

  return data;
};

// NOTE: presignedUrl 을 이용하여 해당 url에 업로드하는 api 구현 예정
// const uploadFile = async (url: string) => {
// }

const imagesApis = {
  getPresignedUrl,
};

export default imagesApis;
