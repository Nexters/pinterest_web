export function isString(str: unknown): str is string {
  return typeof str === 'string';
}
export const convertImageToBase64 = (file : File) => {
  const mediaType = file?.type;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (<string>reader.result).split(',')[1];
      const dataUrl = `data:${mediaType};base64,${base64String}`;
      resolve(dataUrl);
    };
    reader.onerror = () => {
      reject(new Error('이미지 변환에 실패헸습니다'));
    };
    reader.readAsDataURL(file);
  });
};
