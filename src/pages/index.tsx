import { useRouter } from 'next/router';
import { useState } from 'react';
import { Indicator } from '@/components/landing/Indicator';
import { Button } from '@/components/shared/Button';
import { ItemsSlide } from '@/components/user/item/ItemsSlide';

// NOTE : 온보딩 페이지
const items = [
  {
    photo_cut_id: 1,
    title: '',
    image: '/images/onboarding1.png',
    text: '',
  },
  {
    photo_cut_id: 2,
    title: '',
    image: '/images/onboarding2.png',
    text: '',
  },
  {
    photo_cut_id: 3,
    title: '',
    image: '/images/onboarding3.png',
    text: '',
  },
];
export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const router = useRouter();

  return (
    <section>
      <Indicator length={items.length} activeIndex={activeIndex} />
      <ItemsSlide
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <div className='tw-fixed tw-bottom-3 tw-flex tw-w-full tw-max-w-[475px] tw-flex-col tw-items-center tw-gap-3 tw-px-5'>
        <Button
          className='tw-flex tw-h-[50px] tw-w-full tw-flex-row tw-justify-center tw-rounded-[6px]'
          variant='primary'
          onClick={() => router.push('/signin')}
        >
          로그인하기
        </Button>
        <Button
          className='tw-flex tw-h-[50px] tw-w-full tw-flex-row tw-justify-center tw-rounded-[6px] tw-bg-yellow'
          variant='primary'
          onClick={() => router.push('/signup')}
        >
          회원가입하기
        </Button>
      </div>
    </section>
  );
}
