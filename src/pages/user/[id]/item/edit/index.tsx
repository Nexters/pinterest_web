import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { convertImageToBase64 } from '@/utils';
import { Button, Icon, ImageFrame, Input, TextButton, Textarea } from '@/components/shared';

const groupName = 'DDb 팀 버킷리스트';
const MOCK_DATA = {
  id: 1,
  title: '선회식 후회의',
  image: '/images/cat.png',
  description:
    '회의보단 회식이 좋아요....회의보단 회식이 좋아요....회의보단 회식이 좋아요....회의보단 회식이 좋아요....회의보단 회식이 좋아요....회의보단 회식이 좋아요....회의보단 회식이 좋아요....회의보단 회식이 좋아요....회의보단 회식이 좋아요....',
  link: 'grafi.cc',
};
export default function EditPage({ item = MOCK_DATA }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(item.image);

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
        <TextButton color='secondary' onClick={router.back}>
          취소
        </TextButton>
        <TextButton color='primary' onClick={() => router.push('/')}>
          저장
        </TextButton>
      </div>

      {/** 이미지 영역 */}
      <div className='tw-relative'>
        <ImageFrame alt='item image' src={image} className='aspect-[3/4]' />
        <input type='file' accept='image/*' className='tw-hidden' ref={inputRef} onChange={handleFileUpload} />
        <Button
          variant='rounded'
          onClick={handleClick}
          className='tw-absolute tw-bottom-3.5 tw-right-5 tw-h-12 tw-w-12 tw-bg-white'
        >
          <Icon iconType='Camera' width={32} height={32} />
        </Button>
      </div>

      {/** 본문 입력 영역 */}
      <div className='tw-flex tw-flex-col tw-gap-3.5 tw-px-5 tw-py-6'>
        <h1 className='tw-text-main-headline'>{groupName}</h1>
        <Input placeholder='제목을 입력해주세요.' defaultValue={item.title} />
        <Textarea placeholder='설명을 입력해주세요.' defaultValue={item.description} />
        <Input placeholder='링크를 입력해주세요.(선택)' defaultValue={item.link} />
      </div>
    </div>
  );
}
