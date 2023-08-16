import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { useState } from 'react';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import {
  useCreateUserVisitLog,
  useDeleteUserVisitLog,
  useGetUserVisitLogs,
  usersApis,
  usersKeys,
} from '@/query-hooks/useUsers';
import { LoadingView } from '@/components/loading/LoadingView';
import { Dimmed, Icon, Input, Modal, Textarea } from '@/components/shared';
import { useModal } from '@/hooks/useModal';
import { useStoredUserId } from '@/hooks/useStoredUserId';
import { cn } from '@/utils/cn';

interface GuestBookProps {
  userId: string;
}

export default function GuestBookPage({ userId }: GuestBookProps) {
  const router = useRouter();
  const { isOpen, open: openModal, close: closeModal } = useModal();
  const [writerName, setWriterName] = useState('');
  const [content, setContent] = useState('');
  const { storedUserId } = useStoredUserId();
  const getIsLogin = () => userId === storedUserId;

  const { data, isLoading } = useGetUserVisitLogs(userId);
  const createMutation = useCreateUserVisitLog();
  const deleteMutation = useDeleteUserVisitLog();
  const queryClient = useQueryClient();

  const handleOnSaveGuestBook = () => {
    // TODO: API 연결
    createMutation.mutate(
      { name: writerName, text: content, userId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(usersKeys.visitLogs(userId));
          closeModal();
        },
        onError: () => {
          alert('error');
        },
      },
    );
  };

  const handleDeleteGuestBook = (logId: number) => {
    deleteMutation.mutate(
      { userId, logId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(usersKeys.visitLogs(userId));
        },
      },
    );
  };

  if (isLoading) {
    return <LoadingView darkMode />;
  }

  return (
    <div className='tw-min-h-[100vh] tw-bg-black tw-pb-[140px]'>
      {createMutation.isLoading && (
        <Dimmed>
          <LoadingView message='방명록을 저장 중입니다' />
        </Dimmed>
      )}
      <div className='tw-flex tw-items-center tw-justify-between tw-px-5 tw-py-4 tw-text-white'>
        <Icon
          iconType='LeftChevron'
          color='#FFFFFF'
          onClick={() => router.back()}
        />
        <Icon iconType='Plus' color='#FFFFFF' onClick={openModal} />
      </div>
      <div className='tw-grid tw-grid-cols-2 tw-border-t tw-border-white'>
        {data?.map(({ log_id, name, created_at, text }, idx) => {
          return (
            <div
              key={log_id}
              className={cn(
                'tw-h-[188px] tw-border-b tw-border-white tw-pb-4 tw-pl-5 tw-pr-5 tw-pt-5',
                {
                  'tw-border-r': idx % 2 === 0,
                },
              )}
            >
              <p className='tw-text-body1 tw-h-[108px] tw-text-white'>{text}</p>
              <div className='tw-flex tw-items-center tw-justify-between'>
                <div className='tw-flex tw-flex-col tw-gap-1 tw-text-white'>
                  <span className='tw-text-caption'>{name}</span>
                  <span className='tw-text-caption tw-text-grayscale-400'>
                    {created_at}
                  </span>
                </div>
                {getIsLogin() && (
                  <Icon
                    iconType='Close'
                    className='tw-cursor-pointer tw-fill-grayscale-300'
                    onClick={() => handleDeleteGuestBook(log_id)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isOpen}
        title='방명록 작성'
        onCancel={closeModal}
        onSave={handleOnSaveGuestBook}
      >
        <Input
          label='From'
          placeholder='작성자 이름/닉네임을 입력하세요'
          value={writerName}
          onChange={(e) => setWriterName(e.target.value)}
        />
        <Textarea
          label='Memo'
          placeholder='메모를 작성해주세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();
  const userId = query.id as string;

  await queryClient.prefetchQuery(usersKeys.visitLogs(userId), () =>
    usersApis.getUserVisitLogs(userId),
  );
  return { props: { userId, dehydratedState: dehydrate(queryClient) } };
};
