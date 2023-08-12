import axios from 'axios';

const getPresignedUrl = async (filename: string) => {
  const {
    data: { image_url, presigned_url },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_GRAFI_MAIN_HOST}/api/images/presigned-url?filename=${filename}`,
  );

  return { image_url, presigned_url };
};

const uploadFile = async (url: string, file: File) => {
  const data = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return data;
};

const imagesApis = {
  getPresignedUrl,
  uploadFile,
};

export default imagesApis;
