import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@/components/shared';

interface Props {
  isLogin?: boolean;
}

export function EmptyView({ isLogin }: Props) {
  const router = useRouter();

  return (
    <div className='tw-flex tw-flex-col tw-items-center tw-gap-9'>
      <div className='tw-flex tw-flex-col tw-items-center tw-gap-2.5'>
        <Image
          src='/images/film.png'
          alt='empty view'
          width={200}
          height={186}
          priority
        />
        <p className='tw-text-body1 tw-text-grayscale-300'>
          아직 등록된 사진이 없어요
        </p>
      </div>
      {!isLogin && (
        <Button onClick={() => router.push('/signin')}>내 그라피 만들기</Button>
      )}
    </div>
  );
}
