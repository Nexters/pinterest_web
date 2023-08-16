import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useSafeContext } from '@/hooks';
import { ModalContext } from '@/providers';
import { useGetFilms } from '@/query-hooks/useFilms';
import filmsApis from '@/query-hooks/useFilms/api';
import filmsKeys from '@/query-hooks/useFilms/keys';
import { useGetUser, useGetUserVisitLogs } from '@/query-hooks/useUsers';
import usersApis from '@/query-hooks/useUsers/apis';
import usersKeys from '@/query-hooks/useUsers/keys';
import { Avatar, Button, Icon, Tooltip } from '@/components/shared';
import { Drawer } from '@/components/shared/Drawer';
import { AddMenu } from '@/components/user';
import {
  CameraRoll,
  EmptyView,
  FilmAddModal,
  FilmSelectModal,
  FilmTitleModal,
  ProfileModal,
} from '@/components/user';
import { GuestBookBanner } from '@/components/user/guest-book/GuestBookBanner';
import { useStoredUserId } from '@/hooks/useStoredUserId';

export interface Profile {
  profileImage: string;
  nickname: string;
  description: string;
}

interface Film {
  filmId: number | null;
  title: string | null;
}

export default function User({
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { storedUserId } = useStoredUserId();
  const { isLoading, data: filmList, isError } = useGetFilms(userId);
  const { data: userData } = useGetUser(userId);
  const { data: visitLogData } = useGetUserVisitLogs(userId);

  const { status, dispatch } = useSafeContext(ModalContext);
  const getIsLogin = () => userId === storedUserId;

  const {
    isDrawerOpen,
    isAddMenuOpen,
    isProfileModalOpen,
    isFilmAddModalOpen,
    isFilmSelectModalOpen,
    isFilmTitleModalOpen,
  } = status;

  const [editingFilm, setEditingFilm] = useState<Film>({
    title: null,
    filmId: null,
  });

  const handleEditTitle = (title: string, filmId: number) => {
    setEditingFilm({
      title,
      filmId,
    });
    dispatch({ type: 'OPEN_FILM_TITLE_MODAL' });
  };

  const handleEditProfile = () => {
    dispatch({ type: 'OPEN_PROFILE_MODAL' });
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 ㅋ</div>;

  return (
    <div className='tw-relative tw-min-h-screen tw-overflow-x-hidden tw-pb-10 tw-pt-3'>
      {userData && (
        <Avatar
          src={userData.profile_img ?? '/images/avatar-placeholder.png'}
          nickname={userData.name}
          viewCount={userData.visitors}
          isLogin={userId === storedUserId}
          displayMeta
          className='tw-mx-5'
          onEditProfile={handleEditProfile}
        />
      )}
      {userData && (
        <GuestBookBanner
          onClick={() => router.push(`/user/${userId}/guest-book`)}
          isLogin={userId === storedUserId}
          ownerName={userData.name}
          visitLogs={visitLogData}
        />
      )}
      <div className='tw-flex tw-flex-col tw-gap-4'>
        {filmList?.map(({ film_id, photo_cuts, title }) => (
          <CameraRoll
            key={film_id}
            userId={userId}
            filmId={film_id}
            photos={photo_cuts}
            title={title}
            isLogin={getIsLogin()}
            onEditTitle={() => handleEditTitle(title, film_id)}
          />
        ))}
        {!filmList && (
          <div className='tw-mt-[60px]'>
            <EmptyView isLogin={getIsLogin()} />
          </div>
        )}
      </div>
      {getIsLogin() && (
        <Button
          variant='rounded'
          className='tw-fixed tw-bottom-5 tw-right-5'
          onClick={() => dispatch({ type: 'OPEN_ADD_MENU' })}
        >
          ADD
        </Button>
      )}
      {getIsLogin() ? (
        <Icon
          iconType='Menu'
          onClick={() => dispatch({ type: 'OPEN_DRAWER' })}
          className='tw-absolute tw-right-3.5 tw-top-2.5 tw-cursor-pointer'
          width={32}
          height={32}
        />
      ) : (
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
      )}
      {userData && isProfileModalOpen && (
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
      {isFilmTitleModalOpen && editingFilm.filmId && (
        <FilmTitleModal
          filmId={editingFilm.filmId}
          title={editingFilm.title ?? ''}
          isOpen={isFilmTitleModalOpen}
          onCancel={() => dispatch({ type: 'CLOSE_FILM_TITLE_MODAL' })}
        />
      )}
      {isFilmAddModalOpen && (
        <FilmAddModal
          isOpen={isFilmAddModalOpen}
          onCancel={() => dispatch({ type: 'CLOSE_FILM_ADD_MODAL' })}
        />
      )}
      {isFilmSelectModalOpen && (
        <FilmSelectModal
          userId={userId}
          filmList={filmList}
          isOpen={isFilmSelectModalOpen}
          onCancel={() => dispatch({ type: 'CLOSE_FILM_SELECT_MODAL' })}
        />
      )}
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
    queryClient.prefetchQuery(usersKeys.visitLogs(userId), () =>
      usersApis.getUserVisitLogs(userId),
    ),
  ]);

  return {
    props: {
      userId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
