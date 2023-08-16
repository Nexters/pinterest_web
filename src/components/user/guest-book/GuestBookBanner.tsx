import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/shared';
import { useLogin } from '@/hooks/useLogin';

interface GuestBookBannerProps {
  visitLogs?: VisitLog[];
  ownerName: string;
}

interface VisitLog {
  name: string;
  text: string;
  log_id: number;
  created_at: string;
  user_id: string;
}

const Log = ({ text, name }: Pick<VisitLog, 'name' | 'text'>) => {
  return (
    <div className='tw-relative tw-flex tw-h-9 tw-flex-row tw-justify-between tw-py-1.5'>
      <div className='tw-flex tw-flex-row tw-gap-2'>
        <Icon iconType='GuestBook' />
        <p>{text}</p>
      </div>
      <button className='tw-text-grayscale-300'>{`-  ${name}`}</button>
    </div>
  );
};

export const GuestBookBanner = ({
  visitLogs,
  ownerName,
}: GuestBookBannerProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { login } = useLogin();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const translateY = -activeIndex * 36;

  useEffect(() => {
    if (visitLogs && isTransitioning) {
      const id = setTimeout(() => {
        setIsTransitioning(false);
        if (activeIndex === visitLogs.length) {
          setActiveIndex(0);
        }
      }, 300);

      return () => clearTimeout(id);
    }
  }, [activeIndex, isTransitioning, visitLogs]);

  const nextItem = () => {
    setIsTransitioning(true);
    if (visitLogs && visitLogs.length) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (visitLogs.length + 1));
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      nextItem();
    }, 2500);

    return () => clearInterval(id);
  }, []);

  if (!visitLogs || !visitLogs.length) {
    return (
      <div
        className='tw-mx-5 tw-mb-5 tw-mt-3 tw-bg-grayscale-700 tw-px-3.5 tw-py-1.5 tw-text-white'
        onClick={() => router.push(`/user/${id}/guest-book`)}
      >
        {login ? (
          <div className='tw-flex tw-flex-row tw-gap-2'>
            <Icon iconType='GuestBook' />
            <p className='tw-text-grayscale-300'>
              아직 작성된 방명록이 없습니다
            </p>
          </div>
        ) : (
          <>
            <div className='tw-flex tw-flex-row tw-gap-2'>
              <Icon iconType='GuestBook' />
              <p>{`${ownerName}님께 방명록을 남겨주세요`}</p>
            </div>
            <button className='tw-text-grayscale-300'>작성하기</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className='tw-mx-5 tw-mb-5 tw-mt-3 tw-h-9 tw-overflow-hidden tw-bg-grayscale-700 tw-px-3.5 tw-text-white'
      onClick={() => router.push(`/user/${id}/guest-book`)}
    >
      <div
        className={`${
          isTransitioning
            ? 'tw-ease tw-transition-transform tw-duration-500'
            : ''
        }`}
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {visitLogs.map(({ log_id, name, text }) => (
          <Log key={log_id} name={name} text={text} />
        ))}
      </div>
    </div>
  );
};
