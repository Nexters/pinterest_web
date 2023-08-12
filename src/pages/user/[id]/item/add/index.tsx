import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { convertImageToBase64 } from '@/utils';
import { Icon, ImageFrame, Input, TextButton, Textarea } from '@/components/shared';
import { isString } from '@/utils/type-util';

export default function AddPage() {
  const router = useRouter();
  const { id, title } = router.query;

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const convertedImage = await convertImageToBase64(file);
      if (typeof convertedImage === 'string') {
        setImage(convertedImage);
      }
      // Upload API 연결
    }
  };

  return (
    <div className='tw-h-[100vh] tw-w-full tw-bg-white'>
      {/** Header */}
      <div className='tw-flex tw-justify-between tw-p-2.5'>
        <TextButton color='danger' onClick={router.back}>
          취소
        </TextButton>
        <TextButton color='primary' onClick={() => router.push(`/user/${id}/item`)}>
          저장
        </TextButton>
      </div>

      {/** Add Button & 이미지 영역 */}
      {image ? (
        <ImageFrame alt='item image' src={image} className='aspect-[3/4]' />
      ) : (
        <div
          className='tw-flex tw-aspect-[3/4] tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-bg-black'
          onClick={handleClick}
        >
          <input type='file' accept='image/*' className='tw-hidden' ref={inputRef} onChange={handleFileUpload} />
          <Icon iconType='Plus' width={68} height={68} color='#F3F3F3' />
          <p className='tw-text-button-eng tw-text-gray-100'>ADD</p>
        </div>
      )}

      {/** 본문 입력 영역 */}
      <div className='tw-flex tw-flex-col tw-gap-3.5 tw-px-5 tw-py-6'>
        <Input placeholder='제목을 입력해주세요.' value={isString(title) ? title : ''} readOnly />
        <Textarea placeholder='설명을 입력해주세요.' rows={3} />
        {/* <Input placeholder='링크를 입력해주세요.(선택)' /> */}
      </div>
    </div>
  );
}
