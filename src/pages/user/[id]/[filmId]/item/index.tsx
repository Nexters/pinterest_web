import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { filmsApis, filmsKeys, useGetFilm } from '@/query-hooks/useFilms';
import { LoadingView } from '@/components/loading/LoadingView';
import { Icon } from '@/components/shared';
import { ItemsSlide } from '@/components/user/item/ItemsSlide';
import { useStoredUserId } from '@/hooks/useStoredUserId';

interface ItemPageProps {
  userId: string;
}

export default function ItemPage({ userId }: ItemPageProps) {
  const router = useRouter();
  const filmId = router.query.filmId as string;

  const { storedUserId } = useStoredUserId();
  const getIsLogin = () => userId === storedUserId;

  const {
    isLoading,
    data: { title: groupName, photo_cuts: items },
  } = useGetFilm(Number(filmId));

  const index =
    router.query.index === 'latest'
      ? items.length - 1
      : Number(router.query.index) || 0;

  const [activeIndex, setActiveIndex] = useState(index);
  const { title, text, photo_cut_id } = items[activeIndex];

  if (isLoading) {
    return <LoadingView darkMode className='tw-h-[100vh]' />;
  }

  return (
    <div className='bg-black tw-h-[100vh] tw-w-full'>
      {/** Item Header */}
      <div className='tw-flex tw-flex-col tw-gap-2 tw-px-5 tw-py-2'>
        <div className='tw-flex tw-justify-between'>
          <div className='gap-2 tw-flex tw-items-center'>
            <h1 className='tw-text-main-headline tw-text-gray-200'>{title}</h1>
            {getIsLogin() && (
              <Link
                href={`/user/${router.query.id}/${router.query.filmId}/item/edit?cutId=${photo_cut_id}&index=${activeIndex}`}
              >
                <Icon iconType='Edit' color='white' />
              </Link>
            )}
          </div>
          <p className='tw-text-body1 tw-text-gray-300'>{`${activeIndex + 1}/${
            items.length
          }`}</p>
        </div>
        <p className='tw-text-body2 tw-text-gray-400'>{groupName}</p>
      </div>
      {/** Item Image */}
      <ItemsSlide
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      {/** Item Description */}
      <div className='tw-px-5 tw-pt-4'>
        <p className='tw-text-body1 tw-text-gray-300'>{text}</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const filmId: string = query.filmId as string;
  const userId = query.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(filmsKeys.item(Number(filmId)), () =>
    filmsApis.getFilm(Number(filmId)),
  );

  return {
    props: {
      userId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
