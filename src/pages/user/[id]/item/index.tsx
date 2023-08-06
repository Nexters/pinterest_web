import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Icon } from '@/components/shared';
import { ItemsSlide } from '@/components/user/item/ItemsSlide';

const MOCK_DATA = [
  { id: 1, title: '선회식 후회의', image: '/images/cat.png', description: '회의보단 회식이 좋아요....' },
  { id: 2, title: '선회식 후회의~~', image: '/images/cat2.png', description: '회의보단 회식이 좋아요....' },
  { id: 3, title: '선회식 후회의!', image: '/images/cat.png', description: '회의보단 회식이 좋아요....' },
  { id: 4, title: '선회식 후회의!!!!', image: '/images/cat2.png', description: '회의보단 회식이 좋아요....' },
  { id: 5, title: '선회식 후회의', image: '/images/cat.png', description: '회의보단 회식이 좋아요....' },
  { id: 6, title: '고양이 귀여워', image: '/images/cat2.png', description: '나는 언제 집사되냐' },
  { id: 7, title: '고양이 귀여워22', image: '/images/cat.png', description: '나는 언제 집사되냐' },
  { id: 8, title: '고양이 귀여워33', image: '/images/cat2.png', description: '나는 언제 집사되냐' },
  { id: 9, title: '고양이 귀여워44', image: '/images/cat.png', description: '나는 언제 집사되냐' },
  { id: 10, title: '고양이 귀여워55', image: '/images/cat2.png', description: '나는 언제 집사되냐' },
];

export default function ItemPage({ items = MOCK_DATA, isEdit = false }) {
  const router = useRouter();
  const groupName = 'DDb 팀 버킷리스트';
  const [activeIndex, setActiveIndex] = useState(0);
  const { title, description } = items[activeIndex];

  return (
    <div className='bg-black tw-h-[100vh] tw-w-full'>
      {/** Item Header */}
      <div className='tw-flex tw-flex-col tw-gap-2 tw-px-5 tw-py-2'>
        <div className='tw-flex tw-justify-between'>
          <div className='gap-2 tw-flex tw-items-center'>
            <h1 className='tw-text-main-headline tw-text-gray-200'>{title}</h1>
            {isEdit && (
              <Link href={`${router.pathname}/edit`}>
                <Icon iconType='Edit' color='white' />
              </Link>
            )}
          </div>
          <p className='tw-text-body1 tw-text-gray-300'>{`${activeIndex + 1}/10`}</p>
        </div>
        <p className='tw-text-body2 tw-text-gray-400'>{groupName}</p>
      </div>
      {/** Item Image */}
      <ItemsSlide items={MOCK_DATA} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {/** Item Description */}
      <div className='tw-px-5 tw-pt-4'>
        <p className='tw-text-body1 tw-text-gray-300'>{description}</p>
      </div>
    </div>
  );
}
