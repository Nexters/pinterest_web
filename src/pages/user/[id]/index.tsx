import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useSafeContext } from '@/hooks';
import { ModalContext } from '@/providers';
import { useGetFilms } from '@/query-hooks/useFilms';
import filmsApis from '@/query-hooks/useFilms/api';
import filmsKeys from '@/query-hooks/useFilms/keys';
import { useGetUser } from '@/query-hooks/useUsers';
import usersApis from '@/query-hooks/useUsers/apis';
import usersKeys from '@/query-hooks/useUsers/keys';
import { Avatar, Button, Icon, Tooltip } from '@/components/shared';
import { Drawer } from '@/components/shared/Drawer';
import { AddMenu } from '@/components/user';
import {
  CameraRoll,
  FilmAddModal,
  FilmSelectModal,
  FilmTitleModal,
  ProfileModal,
} from '@/components/user';

export interface Profile {
  profileImage: string;
  nickname: string;
  description: string;
}

export default function User({
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isLoading, data: filmList, isError } = useGetFilms(userId);
  const { data: userData } = useGetUser(userId);

  const { status, dispatch } = useSafeContext(ModalContext);

  const {
    isDrawerOpen,
    isAddMenuOpen,
    isProfileModalOpen,
    isFilmAddModalOpen,
    isFilmSelectModalOpen,
    isFilmTitleModalOpen,
  } = status;
  const [editingTitle, setEditingTitle] = useState('');

  const handleEditTitle = (title: string) => {
    setEditingTitle(title);
    dispatch({ type: 'OPEN_FILM_TITLE_MODAL' });
  };

  const handleEditProfile = (info: Profile) => {
    dispatch({ type: 'OPEN_PROFILE_MODAL' });
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 ㅋ</div>;

  return (
    <div className='tw-relative tw-overflow-x-hidden tw-pb-10 tw-pt-3'>
      {userData && (
        <Avatar
          src={userData.profile_img ?? '/images/avatar-placeholder.png'}
          nickname={userData.name}
          displayMeta
          className='tw-mx-5'
          onEditProfile={handleEditProfile}
        />
      )}
      <div className='tw-mx-5 tw-mb-5 tw-mt-3 tw-bg-grayscale-700 tw-px-3.5 tw-py-1.5 tw-text-white'>
        방명록 기능이 추가될 공간입니다 ㅎ
      </div>
      <div className='tw-flex tw-flex-col tw-gap-4'>
        {filmList?.map(({ film_id, photo_cuts, title }) => (
          <CameraRoll
            key={film_id}
            photos={photo_cuts}
            title={title}
            onEditTitle={handleEditTitle}
          />
        ))}
      </div>
      <Button
        variant='rounded'
        className='tw-fixed tw-bottom-5 tw-right-5'
        onClick={() => dispatch({ type: 'OPEN_ADD_MENU' })}
      >
        ADD
      </Button>
      <Tooltip
        text='내 그라피를 만들어보세요!'
        className='tw-absolute tw-right-3.5 tw-top-2.5'
      >
        <Icon
          iconType='Menu'
          onClick={() => dispatch({ type: 'OPEN_DRAWER' })}
          className='tw-cursor-pointer'
          width={32}
          height={32}
        />
      </Tooltip>
      {userData && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          profileImage={
            userData.profile_img ?? '/images/avatar-placeholder.png'
          }
          nickname={userData.name}
          description={userData.text ?? ''}
          onCancel={() => dispatch({ type: 'CLOSE_PROFILE_MODAL' })}
        />
      )}
      <FilmTitleModal
        title={editingTitle}
        isOpen={isFilmTitleModalOpen}
        onCancel={() => dispatch({ type: 'CLOSE_FILM_TITLE_MODAL' })}
      />
      <FilmAddModal
        isOpen={isFilmAddModalOpen}
        onCancel={() => dispatch({ type: 'CLOSE_FILM_ADD_MODAL' })}
      />
      <FilmSelectModal
        isOpen={isFilmSelectModalOpen}
        onCancel={() => dispatch({ type: 'CLOSE_FILM_SELECT_MODAL' })}
      />
      <AddMenu
        isOpen={isAddMenuOpen}
        onClose={() => dispatch({ type: 'CLOSE_ADD_MENU' })}
        onAddFilm={() => dispatch({ type: 'OPEN_FILM_ADD_MODAL' })}
        onUploadPhoto={() => dispatch({ type: 'OPEN_FILM_SELECT_MODAL' })}
      />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => dispatch({ type: 'CLOSE_DRAWER' })}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  userId: string;
}> = async ({ query }) => {
  const queryClient = new QueryClient();
  const userId = query.id as string;

  await Promise.allSettled([
    queryClient.prefetchQuery(filmsKeys.list(userId), () =>
      filmsApis.getFilms(userId),
    ),
    queryClient.prefetchQuery(usersKeys.item(userId), () =>
      usersApis.getUser(userId),
    ),
  ]);

  return {
    props: {
      userId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
