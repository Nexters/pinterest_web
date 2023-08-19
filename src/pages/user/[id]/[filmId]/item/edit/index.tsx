import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { imagesApis } from '@/query-hooks/useImages';
import { useEditPhotoCut, useGetPhotoCut } from '@/query-hooks/usePhotoCuts';
import photoCutsApis from '@/query-hooks/usePhotoCuts/apis';
import photoCutsKeys from '@/query-hooks/usePhotoCuts/keys';
import { LoadingView } from '@/components/loading/LoadingView';
import {
  Button,
  Dimmed,
  Icon,
  ImageFrame,
  Input,
  TextButton,
  Textarea,
} from '@/components/shared';

export default function EditPage() {
  const router = useRouter();
  const { id, filmId, cutId, index } = router.query;
  const { data: item } = useGetPhotoCut(Number(cutId));

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(item.image);

  const [title, setTitle] = useState(item.title);
  const [text, setText] = useState(item.text);
  const [imageIsLoading, setImageIsLoading] = useState(false);

  const editPhotoCut = useEditPhotoCut();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageIsLoading(true);
      const file = e.target.files[0];

      const { image_url, presigned_url } = await imagesApis.getPresignedUrl(
        file.name,
      );
      await imagesApis.uploadFile(presigned_url, file);
      setImageIsLoading(false);

      if (typeof image_url === 'string') {
        setImage(image_url);
      }
    }
  };

  const handleSubmit = () => {
    editPhotoCut.mutate(
      {
        photo_cut_id: item.photo_cut_id,
        title,
        text,
        image,
      },
      {
        onSuccess: () =>
          router.push(`/user/${id}/${filmId}/item?index=${index}`),
      },
    );
  };

  return (
    <div className='tw-h-[100vh] tw-w-full tw-bg-white'>
      {editPhotoCut.isLoading && (
        <Dimmed>
          <LoadingView
            message='그라피를 업로드하는 중입니다'
            className='tw-h-[100vh]'
          />
        </Dimmed>
      )}
      {/** Header */}
      <div className='tw-flex tw-justify-between tw-p-2.5'>
        <TextButton color='secondary' onClick={router.back}>
          취소
        </TextButton>
        <TextButton color='primary' onClick={handleSubmit}>
          저장
        </TextButton>
      </div>

      {/** 이미지 영역 */}
      {imageIsLoading ? (
        <LoadingView
          message='사진을 업로드 하는 중입니다.'
          className='tw-w-100 tw-aspect-[3/4] tw-bg-white'
        />
      ) : (
        <div className='tw-relative'>
          <ImageFrame alt='item image' src={image} className='aspect-[3/4]' />
          <input
            type='file'
            accept='image/*'
            className='tw-hidden'
            ref={inputRef}
            onChange={handleFileUpload}
          />
          <Button
            variant='rounded'
            onClick={handleClick}
            className='tw-absolute tw-bottom-3.5 tw-right-5 tw-h-12 tw-w-12 tw-bg-white'
          >
            <Icon iconType='Camera' width={32} height={32} />
          </Button>
        </div>
      )}

      {/** 본문 입력 영역 */}
      <div className='tw-flex tw-flex-col tw-gap-3.5 tw-px-5 tw-py-6'>
        <Input
          placeholder='제목을 입력해주세요.'
          defaultValue={title}
          onValueChange={(title) => setTitle(title)}
        />
        <Textarea
          placeholder='설명을 입력해주세요.'
          defaultValue={text}
          onValueChange={(text) => setText(text)}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const cutId: string = query.cutId as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(photoCutsKeys.item(Number(cutId)), () =>
    photoCutsApis.getPhotoCut(Number(cutId)),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
