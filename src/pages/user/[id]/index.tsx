import { type ReactElement, useState } from 'react';
import { useSafeContext } from '@/hooks';
import type { NextPageWithLayout } from '@/pages/_app';
import { ModalContext, ModalProvider } from '@/providers';
import { Avatar, Button, Icon } from '@/components/shared';
import { Drawer } from '@/components/shared/Drawer';
import { AddMenu } from '@/components/user';
import { CameraRoll, FilmAddModal, FilmSelectModal, FilmTitleModal } from '@/components/user';

const User: NextPageWithLayout = () => {
  const { status, dispatch } = useSafeContext(ModalContext);
  const { isDrawerOpen, isAddMenuOpen, isFilmAddModalOpen, isFilmSelectModalOpen, isFilmTitleModalOpen } = status;
  const [editingTitle, setEditingTitle] = useState('');

  const handleEditTitle = (title: string) => {
    setEditingTitle(title);
    dispatch({ type: 'OPEN_FILM_TITLE_MODAL' });
  };

  return (
    <div className='tw-relative tw-overflow-x-hidden tw-pb-10 tw-pt-3'>
      <Avatar src='/images/profile.png' nickname='Jichoi' displayMeta className='tw-mx-5' />
      {/* {TODO: 방명록 기능 추가할 때 변경} */}
      <div className='tw-mx-5 tw-mb-5 tw-mt-3 tw-bg-grayscale-700 tw-px-3.5 tw-py-1.5 tw-text-white'>
        방명록 기능이 추가될 공간입니다 ㅎ
      </div>
      <div className='tw-flex tw-flex-col tw-gap-4'>
        <CameraRoll title='고양이짤들' onEditTitle={handleEditTitle} />
        <CameraRoll title='최근에 간 카페' onEditTitle={handleEditTitle} />
        <CameraRoll title='고양이짤들' onEditTitle={handleEditTitle} />
      </div>
      <Button
        variant='rounded'
        className='tw-fixed tw-bottom-5 tw-right-5'
        onClick={() => dispatch({ type: 'OPEN_ADD_MENU' })}
      >
        ADD
      </Button>
      <Icon
        iconType='Menu'
        onClick={() => dispatch({ type: 'OPEN_DRAWER' })}
        className='tw-absolute tw-right-3.5 tw-top-2.5 tw-cursor-pointer'
        width={32}
        height={32}
      />
      <FilmTitleModal
        title={editingTitle}
        isOpen={isFilmTitleModalOpen}
        onCancel={() => dispatch({ type: 'CLOSE_FILM_TITLE_MODAL' })}
      />
      <FilmAddModal isOpen={isFilmAddModalOpen} onCancel={() => dispatch({ type: 'CLOSE_FILM_ADD_MODAL' })} />
      <FilmSelectModal isOpen={isFilmSelectModalOpen} onCancel={() => dispatch({ type: 'CLOSE_FILM_SELECT_MODAL' })} />
      <AddMenu
        isOpen={isAddMenuOpen}
        onClose={() => dispatch({ type: 'CLOSE_ADD_MENU' })}
        onAddFilm={() => dispatch({ type: 'OPEN_FILM_ADD_MODAL' })}
        onUploadPhoto={() => dispatch({ type: 'OPEN_FILM_SELECT_MODAL' })}
      />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch({ type: 'CLOSE_DRAWER' })} />
    </div>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return <ModalProvider>{page}</ModalProvider>;
};

export default User;
