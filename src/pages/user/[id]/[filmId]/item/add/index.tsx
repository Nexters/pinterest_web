import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { imagesApis } from '@/query-hooks/useImages';
import { useCreatePhotoCut } from '@/query-hooks/usePhotoCuts';
import { LoadingView } from '@/components/loading/LoadingView';
import {
  Dimmed,
  Icon,
  ImageFrame,
  Input,
  TextButton,
  Textarea,
} from '@/components/shared';

export default function AddPage() {
  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem('userId');
    if (!user_id) router.push('/');
  }, []);

  const { id, filmId } = router.query;

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const createPhotoCut = useCreatePhotoCut();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const { image_url, presigned_url } = await imagesApis.getPresignedUrl(
        file.name,
      );
      await imagesApis.uploadFile(presigned_url, file);

      if (typeof image_url === 'string') {
        setImage(image_url);
      }
    }
  };

  const handleSubmit = () => {
    createPhotoCut.mutate(
      {
        film_id: Number(filmId),
        title: String(title),
        text,
        image: String(image),
      },
      {
        onSuccess: () => router.push(`/user/${id}/${filmId}/item?index=latest`),
      },
    );
  };

  return (
    <div className='tw-h-[100vh] tw-w-full tw-bg-white'>
      {createPhotoCut.isLoading && (
        <Dimmed>
          <LoadingView message='그라피를 업로드하는 중입니다' />
        </Dimmed>
      )}
      {/** Header */}
      <div className='tw-flex tw-justify-between tw-p-2.5'>
        <TextButton color='danger' onClick={router.back}>
          취소
        </TextButton>
        <TextButton color='primary' onClick={handleSubmit}>
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
          <input
            type='file'
            accept='image/*'
            className='tw-hidden'
            ref={inputRef}
            onChange={handleFileUpload}
          />
          <Icon iconType='Plus' width={68} height={68} color='#F3F3F3' />
          <p className='tw-text-button-eng tw-text-gray-100'>ADD</p>
        </div>
      )}

      {/** 본문 입력 영역 */}
      <div className='tw-flex tw-flex-col tw-gap-3.5 tw-px-5 tw-py-6'>
        <Input
          placeholder='제목을 입력해주세요.'
          onValueChange={(title) => setTitle(title)}
        />
        <Textarea
          placeholder='설명을 입력해주세요.'
          rows={3}
          onValueChange={(text) => setText(text)}
        />
      </div>
    </div>
  );
}
